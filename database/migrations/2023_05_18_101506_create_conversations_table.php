<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // represents individual chat threads
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');   // owner or admin of the chat
            $table->string('title');
            $table->text('last_message')->nullable();   // last message of each conversation
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conversations');
    }
};
