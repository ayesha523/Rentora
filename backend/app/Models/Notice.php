<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    protected $fillable = [
        'published_by',
        'title',
        'content',
    ];

    public function publisher()
    {
        return $this->belongsTo(User::class, 'published_by');
    }
}