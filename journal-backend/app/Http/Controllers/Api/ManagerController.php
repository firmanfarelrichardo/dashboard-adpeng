<?php
/*
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ManagerController extends Controller
{
    public function index() {
        return User::where('role','pengelola')->get();
    }

    public function store(Request $request) {
        $data = $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|min:6',
            'username'=>'nullable' // optional jika mau
        ]);
        $data['password'] = Hash::make($data['password']);
        $data['role'] = 'pengelola';
        return User::create($data);
    }

    public function update(Request $request, User $pengelola) {
        abort_unless($pengelola->role === 'pengelola', 404);
        $data = $request->validate([
            'name'=>'sometimes|required',
            'email'=>'sometimes|required|email|unique:users,email,'.$pengelola->id,
            'password'=>'nullable|min:6',
        ]);
        if (!empty($data['password'])) $data['password'] = Hash::make($data['password']);
        $pengelola->update($data);
        return $pengelola->fresh();
    }

    public function destroy(User $pengelola) {
        abort_unless($pengelola->role === 'pengelola', 404);
        $pengelola->delete();
        return response()->json(['ok'=>true]);
    }
}
*/

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

/**
 * ManagerController menangani operasi CRUD untuk pengguna pengelola.
 * Dapat diakses oleh Superadmin dan Admin.
 */
class ManagerController extends Controller
{
    /**
     * Menampilkan daftar semua pengguna pengelola.
     */
    public function index()
    {
        $managers = User::where('role', 'pengelola')->get();
        return response()->json($managers);
    }

    /**
     * Menyimpan pengguna pengelola baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'], // Dianggap sebagai username
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $manager = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'pengelola',
        ]);

        return response()->json($manager, 201);
    }

    /**
     * Menampilkan pengguna pengelola spesifik.
     */
    public function show($id)
    {
        $manager = User::where('id', $id)->where('role', 'pengelola')->firstOrFail();
        return response()->json($manager);
    }

    /**
     * Memperbarui pengguna pengelola.
     */
    public function update(Request $request, $id)
    {
        $manager = User::where('id', $id)->where('role', 'pengelola')->firstOrFail();

        $request->validate([
            'name' => ['required', 'string', 'max:255'], // Dianggap sebagai username
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class.',email,'.$manager->id],
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $manager->update($updateData);

        return response()->json($manager);
    }

    /**
     * Menghapus pengguna pengelola.
     */
    public function destroy($id)
    {
        $manager = User::where('id', $id)->where('role', 'pengelola')->firstOrFail();
        $manager->delete();

        return response()->json(null, 204);
    }
}
