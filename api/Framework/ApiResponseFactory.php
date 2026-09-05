<?php

namespace Api\Framework;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\StreamInterface;
use Psr\Http\Message\ResponseFactoryInterface;
use Slim\Psr7\Headers;

class ApiResponseFactory implements ResponseFactoryInterface
{
    public function __construct(private string $protocolVersion = '1.1')
    {
    }

    public function createResponse(int $code = 200, string $reasonPhrase = ''): ResponseInterface
    {
        $response = new ApiResponse($code, new Headers([
            'Content-Type' => 'application/json; charset=UTF-8',
        ]));

        return $response->withProtocolVersion($this->protocolVersion);
    }
}