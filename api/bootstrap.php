<?php

use App\Framework\Migration;
use App\Framework\StringUtils;
use Illuminate\Database\Capsule\Manager;
use Psr\Container\ContainerInterface;
use Slim\App;

class Bootstrap
{
    static function boot(App $app)
    {
        $container = $app->getContainer();
        self::bootstrapDatabase($container);
    }

    private static function bootstrapDatabase(ContainerInterface $container)
    {
        $db = $container['settings']['database'];
        $capsule = new Manager();
        $capsule->addConnection([
            'driver' => isset($db['DB_DRIVER']) ? $db['DB_DRIVER'] : 'mysql',
            'host' => isset($db['DB_HOST']) ? $db['DB_HOST'] : 'localhost',
            'database' => isset($db['DB_NAME']) ? $db['DB_NAME'] : 'api_db',
            'username' => isset($db['DB_USER']) ? $db['DB_USER'] : 'root',
            'password' => isset($db['DB_PASSWORD']) ? $db['DB_PASSWORD'] : '',
        ]);
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
