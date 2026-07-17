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
        Schema::create('flats', function (Blueprint $table) {
    $table->id();

    $table->foreignId('apartment_id')
          ->constrained()
          ->cascadeOnDelete();

    $table->string('flat_number');

    $table->integer('floor');

    $table->decimal('rent_amount', 10, 2);

    $table->enum('status', [
        'vacant',
        'occupied'
    ])->default('vacant');

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flats');
    }
};
