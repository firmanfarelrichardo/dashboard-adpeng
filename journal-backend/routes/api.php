<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminUserController;
use App\Http\Controllers\Api\ManagerController;
use App\Http\Controllers\Api\JournalController;
use App\Http\Controllers\Api\JournalAdminController;
use App\Http\Controllers\Api\JournalRequestController;

// Auth
Route::post('/login', [AuthController::class,'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class,'logout']);
    Route::get('/me', [AuthController::class,'me']);

    // ===== ADMIN AREA =====
    Route::middleware(['role:admin'])->group(function () {

        // Hanya super admin yang boleh kelola admin
        Route::middleware('superadmin')->prefix('admin-users')->group(function () {
            Route::get('/', [AdminUserController::class, 'index']);
            Route::post('/', [AdminUserController::class, 'store']);
            Route::put('/{admin}', [AdminUserController::class, 'update']);
            Route::delete('/{admin}', [AdminUserController::class, 'destroy']);
        });

        // Semua admin bisa kelola pengelola
        Route::prefix('managers')->group(function () {
            Route::get('/', [ManagerController::class, 'index']);
            Route::post('/', [ManagerController::class, 'store']);
            Route::put('/{pengelola}', [ManagerController::class, 'update']);
            Route::delete('/{pengelola}', [ManagerController::class, 'destroy']);
        });

        // Admin kelola jurnal + OAI
        Route::prefix('journals')->group(function () {
            Route::get('/', [JournalAdminController::class, 'index']);
            Route::patch('/{journal}/status', [JournalAdminController::class, 'updateStatus']);
            Route::patch('/{journal}/oai', [JournalAdminController::class, 'updateOai']);
        });

        // Admin proses permintaan edit/hapus
        Route::get('/journal-requests', [JournalRequestController::class,'indexAdmin']);
        Route::patch('/journal-requests/{req}', [JournalRequestController::class,'decide']);
    });

    // ===== PENGELOLA AREA =====
    Route::middleware(['role:pengelola'])->prefix('my')->group(function () {
        Route::get('/journals', [JournalController::class,'index']);
        Route::post('/journals', [JournalController::class,'store']);
        Route::get('/journals/{journal}', [JournalController::class,'show']);
        Route::post('/journals/{journal}/submit', [JournalController::class,'submit']);

        // Ajukan edit/hapus
        Route::post('/journals/{journal}/request', [JournalRequestController::class,'store']);
    });
});
