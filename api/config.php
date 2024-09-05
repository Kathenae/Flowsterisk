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