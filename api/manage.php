<?php

use Api\Framework\Console;
use Api\Framework\App;

require_once './vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

require_once './config.php';

class CommandExecutor
{
    private $commands = [];

    public function __construct()
    {
        $this->registerCommand('run', [$this, 'runCommand']);
        $this->registerCommand('list', [$this, 'listCommands']);
    }

    public function executeCommand($commandLine)
    {
        $parts = explode(' ', $commandLine);
        $commandName = array_shift($parts);
        $parameters = $this->parseParameters($parts);

        if (!isset($this->commands[$commandName])) {
            echo "Unknown command: $commandName" . PHP_EOL;
            return;
        }

        $command = $this->commands[$commandName];
        $command($parameters);
    }

    public function registerCommand($commandName, $callback)
    {
        $this->commands[$commandName] = $callback;
    }

    public function runCommand($parameters)
    {
        $port = isset($parameters['port']) ? $parameters['port'] : 8080;
        exec("php -S localhost:$port");
    }

    public function listCommands($parameters)
    {
        echo "Available commands:" . PHP_EOL;
        foreach ($this->commands as $command => $callback) {
            echo Console::color("- $command" . PHP_EOL, 'green');
        }
    }

    public function helloCommand($parameters)
    {
        $name = isset($parameters['name']) ? $parameters['name'] : 'World';
        echo "Hello, $name!" . PHP_EOL;
    }

    private function parseParameters($parts)
    {
        $parameters = [];
        $currentKey = null;

        foreach ($parts as $part) {
            if (strpos($part, '--') === 0) {
                $currentKey = substr($part, 2);
                $parameters[$currentKey] = true;
            } elseif ($currentKey !== null) {
                $parameters[$currentKey] = $part;
                $currentKey = null;
            }
        }

        return $parameters;
    }
}

App::init($config);

$executor = new CommandExecutor();
$executor->registerCommand('build:css', function ($parameters) {
    $watch = isset($parameters['watch']) ? '--watch' : '';
    exec("tailwindcss -i ./public/css/app.css -o ./public/css/tailwind.css --minify $watch");
});

$executor->registerCommand('list:routes', function ($parameters) {
    $routes = App::routes();
    $routeData = [];
    foreach ($routes as $route) {
        if (!isset($routeData[$route->getPattern()]['methods'])) {
            $routeData[$route->getPattern()]['methods'] = '';
        }

        if (!isset($routeData[$route->getPattern()]['name'])) {
            $routeData[$route->getPattern()]['name'] = '';
        }
        $routeData[$route->getPattern()]['methods'] .= implode('|', $route->getMethods()) . '|';
        $routeData[$route->getPattern()]['name'] = $route->getName() ?? '';
        $routeData[$route->getPattern()]['callable'] = $route->getCallable();
    }

    Console::println("");
    Console::println("Available Routes:");
    foreach ($routeData as $path => $route) {
        Console::println(Console::color("Controller => ", "white")  . Console::color($route['callable'], 'green'));
        Console::println(Console::color(" • Path => ", "white")  . $path);
        Console::println(Console::color(" • Methods => ", "white")  . Console::color(rtrim($route['methods'], "|"), 'yellow'));
        Console::println(Console::color(" • Route Name => ", "white") . $route['name']);
        Console::println("");
    }
});

$executor->registerCommand('db:migrate', function ($parameters) {
    App::migration()->migrate();
});

$executor->registerCommand('db:rollback', function ($parameters) {
    App::migration()->rollback();
});

if ($argc <= 1) {
    $executor->listCommands([]);
    return;
}

$commandLine = implode(' ', array_slice($argv, 1));
$executor->executeCommand($commandLine);
