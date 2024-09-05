<?php

use Api\Framework\App;

require_once './vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

require_once './config.php';

App::init($config);
App::run();