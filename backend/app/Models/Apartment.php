<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    protected $fillable = [
        'name',
        'address',
        'manager_id',
    ];

    public function flats()
    {
        return $this->hasMany(Flat::class);
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
}