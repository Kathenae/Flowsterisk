<?php

namespace Api\Middleware;
use Api\Framework\ApiResponse;
use Api\Framework\App;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Slim\Psr7\Headers;

class AccessControlMiddleware {
    public function __invoke(ServerRequestInterface $request, RequestHandlerInterface $handler): Response
    {
        if($request->getMethod() === 'OPTIONS') {
            $response = new ApiResponse(200, new Headers());
        } else {
            $response = $handler->handle($request);
        }

        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, Authentication, Tenant-ID')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    }
}