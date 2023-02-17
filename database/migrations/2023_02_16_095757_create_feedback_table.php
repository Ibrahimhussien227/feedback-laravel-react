<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("feedback", function (Blueprint $table) {
            $table->id();
            $table->string("subject");
            $table->longText("body");
            $table->string("file", 500);
            $table
                ->foreignId("user_id")
                ->references("id")
                ->on("users");
            $table
                ->dateTime("user_created_at")
                ->references("created_at")
                ->on("users");
            $table
                ->string("email")
                ->references("email")
                ->on("users");
            $table
                ->string("name")
                ->references("name")
                ->on("users");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("feedback");
    }
};
