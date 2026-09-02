<?php

namespace Api\Middleware;
use Api\Framework\App;
use Slim\Http\Request;
use Slim\Http\Response;

class AccessControlMiddleware {
    public function __invoke(Request $request, Response $response, callable $next)
    {
        $response = $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, Authentication, Tenant-ID')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        
        if($request->isMethod('OPTIONS')) {
            return $response->withStatus(200);
        }
        return $next($request, $response);        
    }
}