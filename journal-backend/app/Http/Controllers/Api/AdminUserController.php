<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function index() {
        return User::where('role','admin')->get();
    }

    public function store(Request $request) {
        $data = $request->validate([
            'name'=>'required','email'=>'required|email|unique:users,email',
            'password'=>'required|min:6'
        ]);
        $data['password'] = Hash::make($data['password']);
        $data['role'] = 'admin';
        $data['is_super_admin'] = (bool)($request->input('is_super_admin', false));
        return User::create($data);
    }

    public function update(Request $request, User $admin) {
        abort_unless($admin->role === 'admin', 404);
        $data = $request->validate([
            'name'=>'sometimes|required',
            'email'=>'sometimes|required|email|unique:users,email,'.$admin->id,
            'password'=>'nullable|min:6',
            'is_super_admin'=>'boolean'
        ]);
        if (!empty($data['password'])) $data['password'] = Hash::make($data['password']);
        $admin->update($data);
        return $admin->fresh();
    }

    public function destroy(User $admin) {
        abort_unless($admin->role === 'admin', 404);
        $admin->delete();
        return response()->json(['ok'=>true]);
    }
}

