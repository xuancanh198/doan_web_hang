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
        Schema::create('staff', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code')->unique();
            $table->string('username')->index();
            $table->string('password');
            $table->string('fullname')->index();
            $table->string('email')->index();
            $table->string('phone')->nullable();
            $table->integer('status')->default(0);
            $table->text('address')->nullable();
            $table->text('description')->nullable();
            $table->text('avatar')->nullable();
            $table->text('permisstion_detail')->nullable();
            $table->timestamps();
            $table->integer('role_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff');
    }
};
