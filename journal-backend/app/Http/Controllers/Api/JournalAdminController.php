<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Journal;
use Illuminate\Http\Request;

class JournalAdminController extends Controller
{
    public function index() {
        return Journal::with('owner:id,name,email')->latest()->get();
    }

    // Update status
    public function updateStatus(Request $request, Journal $journal) {
        $data = $request->validate([
            'status' => 'required|in:pending,selesai,ditolak,butuh_edit'
        ]);
        $journal->update(['status'=>$data['status']]);
        return $journal->fresh();
    }

    // Edit OAI link (khusus admin)
    public function updateOai(Request $request, Journal $journal) {
        $data = $request->validate(['oai_link' => 'nullable|url']);
        $journal->update(['oai_link' => $data['oai_link'] ?? null]);
        return $journal->fresh();
    }
}

