<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('journals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id') // pemilik = pengelola
                  ->constrained('users')
                  ->cascadeOnDelete();
            $table->string('contact_name');
            $table->string('contact_email');
            $table->string('institution');
            $table->string('faculty');
            $table->string('journal_url');
            $table->string('oai_link')->nullable(); // khusus admin edit
            $table->enum('status', ['draft','pending','selesai','ditolak','butuh_edit'])
                  ->default('draft');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('journals'); }
};
