<?php

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

