<?php

namespace Api\Tests\Feature;

final class AuthEndpointTest extends FeatureTestCase
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