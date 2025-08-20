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
        Schema::table('product', function (Blueprint $table) {
            $table->bigInteger('rent_price')->default(0);
            $table->unsignedInteger('buy_quantity')->default(0);
            $table->unsignedInteger('rent_quantity')->default(0);
            $table->boolean('is_buy')->default(1);
            $table->boolean('is_rent')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product', function (Blueprint $table) {
            $table->dropColumn([
                'rent_price',
                'buy_quantity',
                'rent_quantity',
                'is_buy',
                'is_rent',
            ]);
        });
    }
};
