<?php

namespace Api\Tests\Feature;

use Api\Framework\App;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;
use Slim\Psr7\Factory\ServerRequestFactory;
use Slim\Psr7\Factory\StreamFactory;

abstract class FeatureTestCase extends TestCase
{
    protected function get(string $uri): ResponseInterface
    {
        return $this->request('GET', $uri);
    }

    protected function postJson(string $uri, array $body = []): ResponseInterface
    {
        return $this->request('POST', $uri, $body);
    }

    protected function request(string $method, string $uri, array $body = []): ResponseInterface
    {
        $request = (new ServerRequestFactory())
            ->createServerRequest($method, $uri)
            ->withHeader('Content-Type', 'application/json')
            ->withBody((new StreamFactory())->createStream(json_encode($body)));

        return App::$app->handle($request);
    }

    protected function json(ResponseInterface $response): array
    {
        $response->getBody()->rewind();
        return json_decode($response->getBody()->getContents(), true);
    }
}