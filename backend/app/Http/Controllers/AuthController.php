<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    public function register(Request $request)
    {
        // Validate registration data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:manager,tenant',
        ]);

        // Return validation errors
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
         * User model contains:
         *
         * 'password' => 'hashed'
         *
         * so Laravel automatically hashes the password.
         */
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
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
                'role' => $role->name,
            ],
        ], 201);
    }

    /**
     * Login an existing user.
     */
    public function login(Request $request)
    {
        // Validate login data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Return validation errors
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find user by email
        $user = User::with('role')
            ->where('email', $request->email)
            ->first();

        // Check email and password
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password',
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
                'role' => $user->role?->name,
            ],
        ], 200);
    }

    /**
     * Request a password reset link.
     *
     * Always returns the same public response so that
     * account existence cannot be discovered.
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        /*
         * Laravel's password broker:
         *
         * - finds the user
         * - generates a secure token
         * - stores it in password_reset_tokens
         * - sends the reset notification
         */
        Password::broker('users')->sendResetLink([
            'email' => $request->email,
        ]);

        /*
         * IMPORTANT:
         * Never reveal whether the email exists.
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
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        /*
         * Laravel verifies:
         *
         * - email
         * - reset token
         * - token expiry
         * - token validity
         *
         * On success, Laravel also invalidates the reset token.
         */
        $status = Password::broker('users')->reset(
            [
                'email' => $request->email,
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
                 * so assigning the plain password here causes
                 * Laravel to hash it automatically.
                 */
                $user->password = $password;

                /*
                 * Clear the remember token as an additional
                 * security measure.
                 */
                $user->setRememberToken(
                    \Illuminate\Support\Str::random(60)
                );

                $user->save();

                /*
                 * Revoke all existing Sanctum authentication tokens.
                 *
                 * This logs the user out from existing API sessions.
                 */
                $user->tokens()->delete();
            }
        );

        /*
         * Password successfully changed.
         */
        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'success' => true,
                'message' => 'Password reset successful. Please log in with your new password.',
            ], 200);
        }

        /*
         * Invalid or expired reset token.
         */
        if (
            $status === Password::INVALID_TOKEN ||
            $status === Password::INVALID_USER
        ) {
            return response()->json([
                'success' => false,
                'message' => 'This password reset link is invalid or has expired.',
            ], 400);
        }

        /*
         * Fallback for other password broker failures.
         */
        return response()->json([
            'success' => false,
            'message' => 'Unable to reset the password. Please request a new password reset link.',
        ], 400);
    }

    /**
     * Logout the authenticated user.
     */
    public function logout(Request $request)
    {
        // Delete the token currently being used
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
                'role' => $user->role?->name,
            ],
        ], 200);
    }
}