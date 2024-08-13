<?php

namespace App\Controllers;

use App\Framework\App;
use App\Framework\GET;
use App\Models\Todo;
use Slim\Http\Request;
use Slim\Http\Response;

class ExampleController {

    #[GET('/')]
    public function hello(Request $request, Response $response, array $args){
        $todos = Todo::all();
        return $response->withJson([
            'message' => 'Hello World',
            'todos' => $todos
        ]);
    }
}