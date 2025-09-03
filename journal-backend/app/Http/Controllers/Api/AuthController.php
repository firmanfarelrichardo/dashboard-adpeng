<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // PERBAIKAN: Menggunakan Auth::attempt() yang merupakan cara standar dan aman
        // untuk melakukan autentikasi di Laravel.
        if (!Auth::attempt($request->only('email', 'password'))) {
            // Jika autentikasi gagal, lempar exception yang akan
            // secara otomatis menghasilkan respons JSON 422 Unprocessable Entity.
            throw ValidationException::withMessages([
                'email' => ['Kredensial yang diberikan tidak cocok dengan catatan kami.'],
            ]);
        }
        
        // PERBAIKAN: Regenerasi session ID setelah login berhasil.
        // Ini adalah langkah keamanan yang sangat penting untuk mencegah serangan session fixation.
        $request->session()->regenerate();
        
        // Mengembalikan user yang berhasil login sebagai konfirmasi.
        return response()->json(Auth::user());
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json(['message' => 'Successfully logged out']);
    }
}