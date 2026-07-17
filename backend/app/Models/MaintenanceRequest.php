<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceRequest extends Model
{
    protected $fillable = [
        'complaint_id',
        'assigned_to',
        'remarks',
        'status',
    ];

    public function complaint()
    {
        return $this->belongsTo(Complaint::class);
    }

    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}