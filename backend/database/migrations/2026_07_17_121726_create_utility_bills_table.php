<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('utility_bills', function (Blueprint $table) {
    $table->id();

    $table->foreignId('tenant_id')
          ->constrained()
          ->cascadeOnDelete();

    $table->string('type');

    $table->decimal('amount', 10, 2);

    $table->string('billing_month');

    $table->enum('status', [
        'paid',
        'unpaid'
    ]);

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utility_bills');
    }
};
