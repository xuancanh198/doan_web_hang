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
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type')->nullable()->index();
            $table->string('username')->index();
            $table->string('password');
            $table->string('fullname')->index();
            $table->string('email')->nullable()->index();
            $table->string('phone')->nullable();
            $table->string('address', 5000)->nullable();
            $table->integer('status')->default(0);
            $table->text('avatar')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
