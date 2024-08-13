<?php

use App\Framework\App;

require_once './vendor/autoload.php';
require_once './config.php';

App::init($config);
App::run();