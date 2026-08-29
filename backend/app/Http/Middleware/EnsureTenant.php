<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTenant
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // User must be authenticated.
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
            ], 401);
        }

        // User must have the tenant role.
        if (!$user->role || $user->role->name !== 'tenant') {
            return response()->json([
                'success' => false,
                'message' => 'Tenant access required.',
            ], 403);
        }

        return $next($request);
    }
}