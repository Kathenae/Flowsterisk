<?php

require_once './bootstrap.php';

$config = [
    'displayErrorDetails' => true,
    'addContentLengthHeader' => false, 
    'bootstrap' => Bootstrap::class,
    'migrationsDir' => './Migrations',
    'routing' => [
        'type' => 'attribute_based',
        'namespace' => 'App\\Controllers\\',
        'directory' => './Controllers',
    ],
    'database' => [
        'DB_HOST' => 'localhost',
        'DB_PORT' => '3306',
        'DB_NAME' => 'ombutel',
        'DB_USER' => 'vitalpbx',
        'DB_PASSWORD' => 'vitalpbx',
    ],
];