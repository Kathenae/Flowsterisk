<?php

namespace Api\Tests\Feature;

use Api\Tests\AppTestCase;

final class AuthEndpointTest extends AppTestCase
{
    public function testAuthEndpointRejectsMissingCredentials(): void
    {
        $response = $this->postJson('/auth');
        $body = $this->json($response);

        $this->assertSame(400, $response->getStatusCode());
        $this->assertSame('failure', $body['status']);
        $this->assertSame('VALIDATION_ERROR', $body['code']);
        $this->assertArrayHasKey('username', $body['errors']);
        $this->assertArrayHasKey('password', $body['errors']);
    }
}