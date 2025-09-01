<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * RoleMiddleware
 * Usage in routes: ->middleware(['auth:sanctum', 'role:admin'])
 * Or allow multiple: 'role:admin,pengelola'
 */
class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @param  mixed    ...$roles   // bisa lebih dari satu role
     * @return Response
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        // 1) Pastikan sudah login
        if (!$user) {
            return response()->json(['message' => 'Unauthorized - silakan login terlebih dahulu.'], 401);
        }

        // 2) Jika tidak ada role yg dikirim (misal 'role:' kosong) -> allow
        if (empty($roles)) {
            return $next($request);
        }

        // 3) Jika role user tidak ada di daftar role yg diijinkan -> forbidden
        if (!in_array($user->role, $roles)) {
            return response()->json(['message' => 'Forbidden - akses tidak diizinkan.'], 403);
        }

        // 4) Lolos semua cek -> teruskan request
        return $next($request);
    }
}
