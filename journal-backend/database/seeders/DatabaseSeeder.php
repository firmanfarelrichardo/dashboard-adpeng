<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Panggil semua seeder yang dibutuhkan
        $this->call([
            SuperAdminSeeder::class,
            AdminSeeder::class,
        ]);
    }
}
