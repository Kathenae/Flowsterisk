<?php

namespace Api\Controllers;
use Api\Framework\App;
use Api\Framework\GET;
use Api\Framework\POST;
use Slim\Http\Request;
use Slim\Http\Response;

class AuthController {

    #[GET('/auth')]
    public function index(Request $request, Response $response){
        return $response->withJson([

        ], 200);
    }
}