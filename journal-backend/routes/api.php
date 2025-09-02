<?php
/*
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
});*/




use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminUserController;
use App\Http\Controllers\Api\JournalAdminController;
use App\Http\Controllers\Api\ManagerController;
use App\Http\Controllers\Api\JournalController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rute autentikasi yang tidak memerlukan token
Route::post('/login', [AuthController::class, 'login']);

// Rute yang memerlukan autentikasi melalui Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Rute untuk mendapatkan detail pengguna saat ini
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Rute untuk logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // --- Rute Khusus Superadmin ---
    // Hanya Superadmin yang dapat mengelola akun Admin biasa.
    Route::middleware(['role:superadmin'])->prefix('superadmin')->group(function () {
        Route::apiResource('admins', AdminUserController::class);
    });

    // --- Rute Bersama untuk Semua Admin (Superadmin & Admin) ---
    // Fitur yang dapat diakses oleh kedua peran admin.
    Route::middleware(['role:superadmin,admin'])->prefix('admin')->group(function () {
        // Mengelola akun pengelola (CRUD)
        Route::apiResource('managers', ManagerController::class);
        // Melihat semua jurnal dengan statusnya
        Route::get('journals', [JournalAdminController::class, 'index']);
        // Melihat detail satu jurnal
        Route::get('journals/{id}', [JournalAdminController::class, 'show']);
        // Mengupdate Link OAI pada jurnal
        Route::put('journals/{id}/update-oai', [JournalAdminController::class, 'updateOaiLink']);
    });

    // --- Rute Khusus Manajer (Pengelola) ---
    // Rute untuk manajer jurnal
    Route::middleware(['role:pengelola'])->prefix('manager')->group(function () {
        Route::apiResource('journals', JournalController::class)->except(['index', 'show']);
        Route::get('my-journals', [JournalController::class, 'index']);
        Route::get('my-journals/{id}', [JournalController::class, 'show']);
    });
});


