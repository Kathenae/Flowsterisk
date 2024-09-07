<?php

namespace Api\Framework;

use Illuminate\Database\DatabaseManager;
use Psr\Log\LoggerInterface;
use Slim\App as SlimApp;

class App
{
   public static $app;

   public static function init($config)
   {
      $app = new SlimApp(['settings' => $config]);
      self::$app = $app;

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
   }

   public static function run()
   {
      self::$app->run();
   }

   public static function routes(): array
   {
      return self::$app->getContainer()->router->getRoutes();
   }

   public static function logger(): LoggerInterface
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
      return self::$app->getContainer()->settings[$param] ?? null;
   }
}