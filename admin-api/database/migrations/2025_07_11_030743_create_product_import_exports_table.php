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
        Schema::create('product_import_exports', function (Blueprint $table) {
            $table->id();
            $table->integer('product_id');
            $table->string('code')->unique();
            $table->string('type'); // import hoặc export
            $table->string('mode'); // buy hoặc rent
            $table->integer('quantity')->unsigned();
            $table->decimal('import_price', 10, 2)->nullable();            // giá nhập thực tế
            $table->decimal('expected_sell_price', 10, 2)->nullable();     // giá dự định bán
            $table->decimal('expected_rent_price', 10, 2)->nullable();     // giá dự định cho thuê
            $table->decimal('actual_price_at_that_time', 10, 2)->nullable(); // giá bán/thuê hệ thống tại thời điểm nhập
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_import_exports');
    }
};
