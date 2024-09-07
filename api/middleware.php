<?php
use Api\Middleware\AccessControlMiddleware;
use Api\Middleware\LoggingMiddleware;

return [
    new AccessControlMiddleware(),
    new LoggingMiddleware(),
];