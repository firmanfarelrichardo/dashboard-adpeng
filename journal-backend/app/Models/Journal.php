<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Journal extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id','contact_name','contact_email','institution','faculty','journal_url',
        'oai_link','status'
    ];
    public function owner() { return $this->belongsTo(User::class,'user_id'); }
}
