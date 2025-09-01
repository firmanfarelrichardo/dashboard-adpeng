<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Journal;
use App\Models\JournalChangeRequest;
use Illuminate\Http\Request;

class JournalRequestController extends Controller
{
    // pengelola ajukan
    public function store(Request $request, Journal $journal) {
        abort_if($journal->user_id !== $request->user()->id, 403);
        $data = $request->validate([
            'type' => 'required|in:edit,delete',
            'message' => 'nullable|string'
        ]);
        return JournalChangeRequest::create([
            'journal_id'=>$journal->id,
            'user_id'=>$request->user()->id,
            'type'=>$data['type'],
            'message'=>$data['message'] ?? null,
        ]);
    }

    // admin lihat semua request
    public function indexAdmin() {
        return JournalChangeRequest::with(['journal','user:id,name,email'])
            ->latest()->get();
    }

    // admin putuskan
    public function decide(Request $request, JournalChangeRequest $req) {
        $data = $request->validate(['status'=>'required|in:approved,rejected']);
        $req->update(['status'=>$data['status']]);

        if ($req->status === 'approved' && $req->type === 'delete') {
            $req->journal?->delete();
        }
        return $req->fresh();
    }
}

