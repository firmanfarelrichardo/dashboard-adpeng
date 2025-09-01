<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    */

    // Routes that should be accessible from cross-origins (API endpoints)
    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
    ],

    // Allow any HTTP method (GET, POST, PUT, DELETE, PATCH, OPTIONS, ...)
    'allowed_methods' => ['*'],

    // Allow origins. Use environment variable FRONTEND_URL for convenience.
    // Example in .env: FRONTEND_URL=http://localhost:5173
    // You may add more allowed origins if necessary (e.g. production domain).
    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:5173'),
    ],

    // Allowed origin patterns (optional - useful for subdomains)
    'allowed_origins_patterns' => [],

    // Headers allowed in CORS requests
    'allowed_headers' => ['*'],

    // Headers exposed to the browser
    'exposed_headers' => [],

    // How long in seconds the results of a preflight request can be cached.
    'max_age' => 0,

    /*
     * If your frontend will use the browser cookie-based authentication with
     * Sanctum, set this to true and also ensure FRONTEND_URL includes scheme
     * and correct domain. For Bearer tokens (we use in examples), set false.
     */
    'supports_credentials' => false,
];
