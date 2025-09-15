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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->integer('product_id')->nullable();
            $table->integer('staff_id')->nullable();
            $table->integer('user_id')->nullable();
            $table->string('type', 15)->default('review_user');
            $table->string('title');
            $table->text('content');
            $table->integer('review_count')->default(0);
            $table->integer('like_count')->default(0);
            $table->integer('views_count')->default(0);
            $table->integer('status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
