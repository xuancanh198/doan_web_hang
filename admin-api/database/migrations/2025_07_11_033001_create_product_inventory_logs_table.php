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
        Schema::create('product_inventory_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->index();
            $table->string(column: 'code')->nullable();
            $table->string('action'); // sale, rent, return, import, export, lost, adjust, etc.
            $table->string('mode');   // buy | rent (để biết đang thao tác với hàng bán hay cho thuê)
            $table->string('direction');
            $table->integer('quantity'); // Số lượng thay đổi: + / -
            $table->string('source')->nullable();    // Ví dụ: order, rent_order, import_batch, manual, system
            $table->text('note')->nullable(); // Ghi chú nội bộ nếu có
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_inventory_logs');
    }
};
