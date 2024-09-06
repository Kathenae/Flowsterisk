<?php

use Api\Framework\ApiRequest;
use Api\Framework\ApiResponse;
use Api\Framework\Migration;
use Illuminate\Database\Capsule\Manager;
use Psr\Container\ContainerInterface;
use Slim\App;
use Slim\Http\Headers;

class Bootstrap
{
    static function boot(App $app)
    {
        $container = $app->getContainer();
        self::registerRequestResponse($container);
        self::registerMiddlewares($app);
        self::bootstrapDatabase($container);
    }

    private static function registerRequestResponse(ContainerInterface $container) {
        $container["response"] = function() use ($container) {
            $headers = new Headers(['Content-Type' => 'application/json; charset=UTF-8']);
            $response = new ApiResponse(200, $headers);
            return $response->withProtocolVersion($container->get('settings')['httpVersion']);
        };

        $container["request"] = function() use ($container) {
            return ApiRequest::createFromEnvironment($container->get('environment'));
        };
    }

    private static function registerMiddlewares(App $app) {
        $middlewares = require('./middleware.php');
        foreach($middlewares as $middleware){
            $app->add($middleware);
        }
    }

    private static function bootstrapDatabase(ContainerInterface $container)
    {
        $connections = $container['settings']['database'];
        $capsule = new Manager();

        foreach ($connections as $connectionName => $param) {
            $capsule->addConnection([
                'driver' => $param['DRIVER'] ?? 'mysql',
                'host' => $param['HOST'] ?? 'localhost',
                'database' => $param['DATABASE'] ?? null,
                'username' => $param['USERNAME'] ?? null,
                'password' => $param['PASSWORD'] ?? null
            ], $connectionName);
        }
        $capsule->setAsGlobal();
        $capsule->bootEloquent();

        $container['database'] = function ($c) use ($capsule) {
            return $capsule->getDatabaseManager();
        };

        $container['migration'] = function ($c) {
            return new Migration($c['settings']['migrationsDir']);
        };
    }
}
