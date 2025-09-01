<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Journal;
use Illuminate\Http\Request;

class JournalController extends Controller
{
    // List milik pengelola
    public function index(Request $request) {
        return Journal::where('user_id', $request->user()->id)->latest()->get();
    }

    // Create draft (form wajib)
    public function store(Request $request) {
        $data = $request->validate([
            'contact_name'=>'required',
            'contact_email'=>'required|email',
            'institution'=>'required',
            'faculty'=>'required',
            'journal_url'=>'required|url',
        ]);
        $data['user_id'] = $request->user()->id;
        $data['status'] = 'draft';
        return Journal::create($data);
    }

    // Preview = get data (frontend yang menampilkan)
    public function show(Journal $journal, Request $request) {
        $this->authorizeOwner($journal, $request);
        return $journal;
    }

    // Submit (2-step verifikasi dilakukan di frontend)
    public function submit(Journal $journal, Request $request) {
        $this->authorizeOwner($journal, $request);
        if ($journal->status !== 'draft') {
            return response()->json(['message'=>'Hanya draft yang bisa disubmit'], 422);
        }
        $journal->update(['status' => 'pending']);
        return $journal->fresh();
    }

    // Ajukan edit/hapus dibuat di controller lain
    private function authorizeOwner(Journal $journal, Request $request): void {
        abort_if($journal->user_id !== $request->user()->id, 403);
    }
}
