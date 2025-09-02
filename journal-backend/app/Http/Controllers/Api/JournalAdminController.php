<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Journal;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

/**
 * JournalAdminController menangani logika terkait jurnal untuk admin.
 */
class JournalAdminController extends Controller
{
    /**
     * Menampilkan daftar semua jurnal untuk admin.
     * Admin dapat melihat semua jurnal terlepas dari statusnya.
     */
    public function index()
    {
        // Mengambil semua jurnal beserta relasi penggunanya
        $journals = Journal::with('user')->get();
        return response()->json($journals);
    }

    /**
     * Menampilkan detail jurnal spesifik.
     * Termasuk data lengkap untuk diperiksa oleh admin.
     */
    public function show($id)
    {
        $journal = Journal::with('user')->findOrFail($id);
        return response()->json($journal);
    }

    /**
     * Memperbarui kolom Link OAI pada jurnal spesifik.
     * Fungsi ini hanya dapat diakses oleh admin.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateOaiLink(Request $request, $id)
    {
        // Validasi input, memastikan link_oai ada dan merupakan URL yang valid
        $request->validate([
            'link_oai' => ['required', 'url'],
        ]);

        // Temukan jurnal berdasarkan ID
        $journal = Journal::findOrFail($id);

        // Perbarui hanya kolom link_oai
        $journal->update([
            'link_oai' => $request->link_oai,
        ]);

        // Kembalikan respons sukses beserta data jurnal yang diperbarui
        return response()->json($journal);
    }

    /**
     * Memperbarui status jurnal spesifik (misalnya, pending, selesai, dll.).
     * Fungsi ini hanya dapat diakses oleh admin untuk memproses pendaftaran jurnal.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatus(Request $request, $id)
    {
        // Validasi input, memastikan status yang diberikan adalah salah satu dari nilai yang diizinkan.
        $request->validate([
            'status' => ['required', 'string', Rule::in(['pending', 'selesai', 'ditolak', 'butuh_edit'])],
        ]);

        // Temukan jurnal berdasarkan ID
        $journal = Journal::findOrFail($id);

        // Perbarui hanya kolom status
        $journal->update([
            'status' => $request->status,
        ]);

        // Kembalikan respons sukses beserta data jurnal yang diperbarui
        return response()->json($journal);
    }
}

