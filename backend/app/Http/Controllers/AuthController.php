<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * Only Gmail / Googlemail addresses are allowed.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',

            'email' => [
    'required',
    'email',
    'regex:/^[^@\s]+@gmail\.com$/i',
    'unique:users,email',
],

            'phone' => 'nullable|string|max:20',

            'password' => 'required|string|min:8|confirmed',

            'role' => 'required|in:manager,tenant',
        ], [
            'email.regex' => 'Please use a valid Gmail address @gmail.com.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the selected role
        $role = Role::where('name', $request->role)->first();

        if (!$role) {
            return response()->json([
                'success' => false,
                'message' => 'Selected role does not exist.',
            ], 422);
        }

        /*
         * Create the user.
         *
         * User model uses:
         *
         * 'password' => 'hashed'
         *
         * so Laravel automatically hashes the password.
         */
        $user = User::create([
            'name' => $request->name,
            'email' => strtolower($request->email),
            'phone' => $request->phone,
            'password' => $request->password,
            'role_id' => $role->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'avatar' => $user->avatar,
                'role' => $role->name,
            ],
        ], 201);
    }

    /**
     * Login an existing user.
     *
     * Only Gmail / Googlemail addresses are allowed.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => [
    'required',
    'email',
    'regex:/^[^@\s]+@gmail\.com$/i',
],

            'password' => 'required|string',
        ], [
            'email.regex' => 'Please use a valid Gmail address @gmail.com.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find user by email
        $user = User::with('role')
            ->where('email', strtolower($request->email))
            ->first();

        /*
         * Google-only accounts have a null password.
         *
         * They cannot use normal email/password login.
         */
        if (
            !$user ||
            !$user->password ||
            !Hash::check($request->password, $user->password)
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password.',
            ], 401);
        }

        // Create Sanctum authentication token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'avatar' => $user->avatar,
                'role' => $user->role?->name,
            ],
        ], 200);
    }

    /**
     * Request a password reset link.
     *
     * Only Gmail / Googlemail addresses are accepted.
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => [
                'required',
                'email',
                'regex:/^[^@\s]+@gmail\.com$/i',
            ],
        ], [
            'email.regex' => 'Please use a valid Gmail address @gmail.com.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        Password::broker('users')->sendResetLink([
            'email' => strtolower($request->email),
        ]);

        /*
         * Never reveal whether the account exists.
         */
        return response()->json([
            'success' => true,
            'message' => 'If an account exists for that email address, a password reset link has been sent.',
        ], 200);
    }

    /**
     * Reset the user's password.
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => [
                'required',
                'email',
                'regex:/^[^@\s]+@gmail\.com$/i',
            ],

            'token' => 'required|string',

            'password' => 'required|string|min:8|confirmed',
        ], [
            'email.regex' => 'Please use a valid Gmail address @gmail.com.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $status = Password::broker('users')->reset(
            [
                'email' => strtolower($request->email),
                'password' => $request->password,
                'password_confirmation' => $request->password_confirmation,
                'token' => $request->token,
            ],
            function (User $user, string $password) {

                /*
                 * User model uses:
                 *
                 * 'password' => 'hashed'
                 *
                 * so Laravel hashes the password automatically.
                 */
                $user->password = $password;

                /*
                 * Clear remember token.
                 */
                $user->setRememberToken(
                    \Illuminate\Support\Str::random(60)
                );

                $user->save();

                /*
                 * Revoke existing Sanctum tokens.
                 */
                $user->tokens()->delete();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'success' => true,
                'message' => 'Password reset successful. Please log in with your new password.',
            ], 200);
        }

        if (
            $status === Password::INVALID_TOKEN ||
            $status === Password::INVALID_USER
        ) {
            return response()->json([
                'success' => false,
                'message' => 'This password reset link is invalid or has expired.',
            ], 400);
        }

        return response()->json([
            'success' => false,
            'message' => 'Unable to reset the password. Please request a new password reset link.',
        ], 400);
    }

    /**
     * Redirect the user to Google authentication.
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')
            ->stateless()
            ->redirect();
    }

    /**
     * Handle Google's authentication callback.
     */
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->user();
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unable to authenticate with Google.',
            ], 401);
        }

        /*
         * Google must provide an email address.
         */
        if (!$googleUser->getEmail()) {
            return response()->json([
                'success' => false,
                'message' => 'Google did not provide an email address.',
            ], 422);
        }

       $googleEmail = strtolower($googleUser->getEmail());

if (!preg_match('/^[^@\s]+@gmail\.com$/i', $googleEmail)) {
    return response()->json([
        'success' => false,
        'message' => 'Only Gmail accounts (@gmail.com) can use Rentora.',
    ], 403);
}

        /*
         * First try to find the user by Google ID.
         */
        $user = User::with('role')
            ->where('google_id', $googleUser->getId())
            ->first();

        /*
         * If Google ID is not linked yet, find the user by email.
         */
        if (!$user) {
            $user = User::where('email', $googleEmail)
                ->first();

            if ($user) {
                $user->google_id = $googleUser->getId();

                if (!$user->avatar && $googleUser->getAvatar()) {
                    $user->avatar = $googleUser->getAvatar();
                }

                $user->save();
                $user->load('role');
            }
        }

        /*
         * Create a new Google account if one does not exist.
         *
         * New Google accounts are tenants by default.
         */
        if (!$user) {

            $role = Role::where('name', 'tenant')->first();

            if (!$role) {
                return response()->json([
                    'success' => false,
                    'message' => 'Default user role is not configured.',
                ], 500);
            }

            $user = User::create([
                'name' => $googleUser->getName() ?: 'Google User',
                'email' => $googleEmail,
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
                'role_id' => $role->id,
                'password' => null,
            ]);

            $user->load('role');
        }

        /*
         * Create a Sanctum token.
         */
        $token = $user->createToken('auth_token')->plainTextToken;

        /*
         * Redirect to React.
         */
        return redirect(
            env('FRONTEND_URL') .
            '/auth/google/callback?token=' .
            urlencode($token)
        );
    }

    /**
     * Logout the authenticated user.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout successful',
        ]);
    }

    /**
     * Get the currently authenticated user.
     */
    public function user(Request $request)
    {
        $user = $request->user()->load('role');

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'avatar' => $user->avatar,
                'role' => $user->role?->name,
            ],
        ], 200);
    }
}