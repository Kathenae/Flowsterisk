<?php

use Api\Framework\ApiRequest;
use Api\Framework\ApiResponse;
use Api\Framework\Migration;
use Illuminate\Database\Capsule\Manager;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Psr\Container\ContainerInterface;
use Slim\App;
use Slim\Http\Headers;

class Bootstrap
{
    public function __construct(
        private App $app
    ) {}
    
    public function boot()
    {
        $this->bootHttp();
        $this->bootMiddlewares();
        $this->bootDatabase();
        $this->bootLogger();
    }

    private function bootHttp() {
        $container = $this->app->getContainer();
        $container["response"] = function() use ($container) {
            $headers = new Headers(['Content-Type' => 'application/json; charset=UTF-8']);
            $response = new ApiResponse(200, $headers);
            return $response->withProtocolVersion($container->get('settings')['httpVersion']);
        };

        $container["request"] = function() use ($container) {
            return ApiRequest::createFromEnvironment($container->get('environment'));
        };
    }

    private function bootMiddlewares() {
        $middlewares = require('./middleware.php');
        foreach($middlewares as $middleware){
            $this->app->add($middleware);
        }
    }

    private function bootDatabase()
    {
        $container = $this->app->getContainer();
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

    private function bootLogger()
    {
        $container = $this->app->getContainer();
        $container['logger'] = function (ContainerInterface $c) {
            $logger = new Logger('app_logger');

            $handler = new StreamHandler("logs/info.log", Logger::INFO);
            $logger->pushHandler($handler);

            $handler = new StreamHandler("logs/error.log", Logger::ERROR);
            $logger->pushHandler($handler);

            $handler = new StreamHandler("logs/critical.log", Logger::CRITICAL);
            $logger->pushHandler($handler);
            return $logger;
        };
    }
}
