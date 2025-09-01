<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Hanya boleh diakses oleh user yang memiliki boolean is_super_admin = true
 */
class SuperAdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized - silakan login terlebih dahulu.'], 401);
        }

        if (empty($user->is_super_admin) || $user->is_super_admin == false) {
            return response()->json(['message' => 'Forbidden - hanya Super Admin yang dapat mengakses.'], 403);
        }

        return $next($request);
    }
}
