<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JournalChangeRequest extends Model
{
    use HasFactory;
    protected $fillable = ['journal_id','user_id','type','message','status'];
    public function journal(){ return $this->belongsTo(Journal::class); }
    public function user(){ return $this->belongsTo(User::class); }
}
