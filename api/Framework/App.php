<?php

namespace Api\Framework;

use Illuminate\Database\DatabaseManager;
use Slim\App as SlimApp;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Psr\Container\ContainerInterface;

class App
{
   public static $app;

   public static function init($config)
   {
      $app = new SlimApp(['settings' => $config]);

      self::setupLogger($app);

      if (isset($config['bootstrap'])) {
         $config['bootstrap']::boot($app);
      }

      $router = new Router();
      $router->resolve(
         $app,
         namespace: $config['routing']['namespace'],
         searchDirectory: $config['routing']['directory']
      );
      self::$app = $app;
   }

   private static function setupLogger(SlimApp $app, string $logFile = "logs/app.log")
   {
      // Logger
      $container = $app->getContainer();
      $container['logger'] = function (ContainerInterface $c) use ($logFile) {
         $logger = new Logger('app_logger');
         $fileHandler = new StreamHandler($logFile);
         $logger->pushHandler($fileHandler);
         return $logger;
      };
   }

   public static function run()
   {
      self::$app->run();
   }

   public static function routes(): array
   {
      return self::$app->getContainer()->router->getRoutes();
   }

   public static function logger(): Logger
   {
      return self::$app->getContainer()->logger;
   }

   public static function database(): DatabaseManager {
      return self::$app->getContainer()->database;
   }

   public static function migration(): Migration
   {
      return self::$app->getContainer()->migration;
   }

   public static function settings(string $param) 
   {
      return self::$app->getContainer()->settings[$param];
   }
}