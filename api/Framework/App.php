<?php

namespace Api\Framework;

use DI\Container;
use Illuminate\Database\DatabaseManager;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Log\LoggerInterface;
use Slim\Factory\AppFactory;

class App
{
   public static $app;

   public static function init($config)
   {
      $container = new Container();
      $container->set('settings', $config);
      $app = AppFactory::create(
         new ApiResponseFactory($config['httpVersion'] ?? '1.1'),
         $container
      );
      self::$app = $app;

      $app->addRoutingMiddleware();

      $bootstraper = self::settings('bootstrap');
      if (isset($bootstraper)) {
         $bootstraper = new $bootstraper($app);
         $bootstraper->boot();
      }

      $router = new Router();
      $routing = self::settings('routing');
      $router->resolve(
         $app,
         namespace: $routing['namespace'],
         searchDirectory: $routing['directory']
      );

      $app->addBodyParsingMiddleware();
      $app->add(function (ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface {
         if (!$request instanceof ApiRequest) {
            $request = ApiRequest::fromRequest($request);
         }

         return $handler->handle($request);
      });
      $errorMiddleware = $app->addErrorMiddleware(
         $config['displayErrorDetails'] ?? false,
         true,
         true
      );
      $errorMiddleware->setDefaultErrorHandler(new ApiErrorHandler(self::logger()));
   }

   public static function run()
   {
      self::$app->run();
   }

   public static function routes(): array
   {
      return self::$app->getRouteCollector()->getRoutes();
   }

   public static function logger(): LoggerInterface
   {
      return self::$app->getContainer()->get('logger');
   }

   public static function database(): DatabaseManager {
      return self::$app->getContainer()->get('database');
   }

   public static function migration(): Migration
   {
      return self::$app->getContainer()->get('migration');
   }

   public static function settings(string $param) 
   {
      return self::$app->getContainer()->get('settings')[$param] ?? null;
   }
}