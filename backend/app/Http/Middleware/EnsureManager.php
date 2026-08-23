<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureManager
{
    /**
     * Allow only authenticated users with the manager role.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || !$user->role || $user->role->name !== 'manager') {
            return response()->json([
                'success' => false,
                'message' => 'Manager access required.',
            ], 403);
        }

        return $next($request);
    }
}