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
        Schema::create('product', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('slug')->unique();
            $table->integer('category_id')->index();
            $table->integer('author_id')->index();
            $table->integer('publisher_id')->index();
            $table->tinyInteger('status')->default(1)->index();
            $table->bigInteger('price')->default(0);
            $table->integer('pages');
            $table->bigInteger('view_count')->default(0);
            $table->unsignedInteger('quantity')->default(0);
            $table->bigInteger('add_card_view')->default(0);
            $table->string('code')->unique();
            $table->string('coverPhoto', 5000);
            $table->text('description');
            $table->text('images');
            $table->text('lang');
            $table->text('tags')->nullable();
            $table->text('figures')->nullable();
            $table->date('published_ad')->nullable();
            $table->date('started_ad')->nullable();
            $table->date('ended_ad')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
