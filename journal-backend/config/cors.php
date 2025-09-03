<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Di sini kamu dapat mengonfigurasi pengaturan untuk CORS. Ini menentukan
    | operasi lintas asal apa yang dapat dieksekusi di browser web.
    |
    | Info lebih lanjut: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout'],

    'allowed_methods' => ['*'],

    // Pastikan URL frontend kamu ada di sini.
    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost:5173')),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // PERBAIKAN UTAMA:
    // Nilai ini HARUS `true` agar browser diizinkan mengirim cookie
    // ke backend, yang merupakan kunci dari autentikasi Sanctum SPA.
    'supports_credentials' => true,

];