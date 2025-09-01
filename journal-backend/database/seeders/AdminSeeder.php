<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin2@unila.test'],
            [
                'name' => 'Admin Biasa',
                'password' => Hash::make('password123'),
                'role' => 'admin'
            ]
        );
    }
}
