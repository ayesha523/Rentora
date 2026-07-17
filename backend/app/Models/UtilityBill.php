<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UtilityBill extends Model
{
    protected $fillable = [
        'tenant_id',
        'type',
        'amount',
        'billing_month',
        'status',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}