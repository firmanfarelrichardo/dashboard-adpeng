<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class AdminUserController extends Controller
{
    /**
     * Menampilkan daftar semua akun admin.
     * Hanya pengguna dengan role 'admin' yang akan ditampilkan.
     */
    public function index()
    {
        // Mengambil semua user dengan role 'admin' dan mengurutkannya dari yang terbaru
        $admins = User::where('role', 'admin')->latest()->get();
        return response()->json($admins);
    }

    /**
     * Menyimpan akun admin baru ke dalam database.
     */
    public function store(Request $request)
    {
        // Validasi data yang masuk dari frontend
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Membuat user baru dengan role 'admin'
        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        return response()->json($admin, 201); // 201 Created
    }

    /**
     * Menampilkan detail satu akun admin.
     */
    public function show(User $admin)
    {
        // Mengembalikan data admin yang diminta
        return response()->json($admin);
    }

    /**
     * Memperbarui data akun admin yang ada.
     */
    public function update(Request $request, User $admin)
    {
        // Validasi data yang masuk, email harus unik kecuali untuk user itu sendiri
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $admin->id],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        // Memperbarui data user
        $admin->name = $request->name;
        $admin->email = $request->email;
        // Hanya update password jika diisi
        if ($request->filled('password')) {
            $admin->password = Hash::make($request->password);
        }
        $admin->save();

        return response()->json($admin);
    }

    /**
     * Menghapus akun admin dari database.
     */
    public function destroy(User $admin)
    {
        // Menghapus user
        $admin->delete();
        return response()->json(null, 204); // 204 No Content
    }
}
