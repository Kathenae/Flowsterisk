<?php

namespace Api\Middleware;
use Api\Framework\ApiRequest;
use Api\Framework\ApiResponse;
use Api\Framework\App;

class LoggingMiddleware {
    public function __invoke(ApiRequest $request, ApiResponse $response, callable $next)
    {

        App::logger()->info(
            $request->getMethod() . " " . 
            $request->getUri()->getPath() . " " . 
            $request->getProtocolVersion() . " - " . 
            $request->getClientIpAddress()
        );
        return $next($request, $response);        
    }
}