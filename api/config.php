<?php

require_once './bootstrap.php';

$config = [
    'displayErrorDetails' => true,
    'addContentLengthHeader' => false, 
    'bootstrap' => Bootstrap::class,
    'migrationsDir' => './Migrations',
    'routing' => [
        'type' => 'attribute_based',
        'namespace' => 'Api\\Controllers\\',
        'directory' => './Controllers',
    ],
    'address_stack' => [
        "REMOTE_ADDR", // Realible only when client not using proxies
        "HTTP_X_FORWARDED_FOR", // Reliable only when using a reverse proxy, which then is only as reliable as REMOTE_ADDR
    ],
    'database' => [
        'default' => [
            'HOST' => $_ENV['DB_HOST'] ?? 'localhost',
            'DATABASE' => $_ENV['DB_NAME'] ?? null,
            'USERNAME' => $_ENV['DB_USERNAME'] ?? null,
            'PASSWORD' => $_ENV['DB_PASSWORD'] ?? null,
        ],
        'modules' => [
            'HOST' => $_ENV['OMBU_DB_HOST'] ?? null,
            'DATABASE' => $_ENV['OMBU_DB_NAME'] ?? null,
            'USERNAME' => $_ENV['OMBU_DB_USERNAME'] ?? null,
            'PASSWORD' => $_ENV['OMBU_DB_PASSWORD'] ?? null
        ]
    ],
];