<?php

use Api\Framework\ApiRequest;
use Api\Framework\ApiResponse;
use Api\Framework\Migration;
use Illuminate\Database\Capsule\Manager;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Psr\Container\ContainerInterface;
use Slim\App;
use Slim\Psr7\Headers;

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
        $container->set("response", function() use ($container) {
            $headers = new Headers(['Content-Type' => 'application/json; charset=UTF-8']);
            $response = new ApiResponse(200, $headers);
            return $response->withProtocolVersion($container->get('settings')['httpVersion'] ?? '1.1');
        });

        $container->set("request", fn () => ApiRequest::fromRequest(
            \Slim\Psr7\Factory\ServerRequestFactory::createFromGlobals()
        ));
    }

    private function bootMiddlewares() {
        $middlewares = require(__DIR__ . '/middleware.php');
        foreach($middlewares as $middleware){
            $this->app->add($middleware);
        }
    }

    private function bootDatabase()
    {
        $container = $this->app->getContainer();
        $connections = $container->get('settings')['database'];
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

        $container->set('database', function ($c) use ($capsule) {
            return $capsule->getDatabaseManager();
        });

        $container->set('migration', function ($c) {
            return new Migration($c->get('settings')['migrationsDir']);
        });
    }

    private function bootLogger()
    {
        $container = $this->app->getContainer();
        $container->set('logger', function (ContainerInterface $c) {
            $logger = new Logger('app_logger');

            $handler = new StreamHandler(__DIR__ . "/logs/info.log", Logger::INFO);
            $logger->pushHandler($handler);

            $handler = new StreamHandler(__DIR__ . "/logs/error.log", Logger::ERROR);
            $logger->pushHandler($handler);

            $handler = new StreamHandler(__DIR__ . "/logs/critical.log", Logger::CRITICAL);
            $logger->pushHandler($handler);
            return $logger;
        });
    }
}
