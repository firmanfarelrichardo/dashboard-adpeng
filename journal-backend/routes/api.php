<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JournalAdminController;
use App\Http\Controllers\Api\JournalController;
use App\Http\Controllers\Api\ManagerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rute Publik (tidak perlu login)
Route::post('/login', [AuthController::class, 'login']);

// Grup Rute yang Memerlukan Autentikasi
Route::middleware('auth:sanctum')->group(function () {
    // Mendapatkan data user yang sedang login
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // --- Rute Superadmin ---
    Route::middleware(['role:superadmin'])->prefix('superadmin')->group(function () {
        Route::apiResource('admins', AdminController::class);
    });
    
    // --- Rute Admin (termasuk Superadmin) ---
    Route::middleware(['role:admin,superadmin'])->prefix('admin')->group(function () {
        Route::apiResource('managers', ManagerController::class);
        Route::apiResource('journals', JournalAdminController::class)->only(['index', 'show']);
        Route::put('journals/{journal}', [JournalAdminController::class, 'update']);
    });

    // --- Rute Pengelola ---
    Route::middleware(['role:pengelola'])->prefix('my')->group(function () {
        Route::apiResource('journals', JournalController::class)->except(['update', 'destroy']);
    });
});