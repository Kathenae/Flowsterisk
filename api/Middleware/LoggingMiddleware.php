<?php

namespace Api\Middleware;
use Api\Framework\ApiRequest;
use Api\Framework\ApiResponse;
use Api\Framework\App;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Server\RequestHandlerInterface;

class LoggingMiddleware {
    public function __invoke(ApiRequest $request, RequestHandlerInterface $handler): ResponseInterface
    {

        App::logger()->info(
            $request->getMethod() . " " . 
            $request->getUri()->getPath() . " " . 
            $request->getProtocolVersion() . " - " . 
            $request->getClientIpAddress()
        );
        return $handler->handle($request);
    }
}