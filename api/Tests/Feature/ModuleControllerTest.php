<?php

namespace Api\Tests\Feature;

use Api\Modules\Module;
use Api\Tests\AppTestCase;

final class ModuleControllerTest extends AppTestCase
{
    public function testListsModuleEntries(): void
    {
        $response = $this->get('/modules/extensions');
        $body = $this->json($response);

        $this->assertSame(200, $response->getStatusCode());
        $this->assertSame('success', $body['status']);
        $this->assertIsArray($body['data']);
    }

    public function testGetsModuleEntryById(): void
    {
        $extension = Module::FromName('extensions')->first();
        $this->assertNotNull($extension);

        $response = $this->get('/modules/extensions/' . $extension->getKey());
        $body = $this->json($response);

        $this->assertSame(200, $response->getStatusCode());
        $this->assertSame('success', $body['status']);
        $this->assertSame($extension->getKey(), $body['data']['extension_id']);
        $this->assertSame('extensions', $body['data']['_node']['type']);
    }

    public function testRejectsInvalidModuleDataWhenCreatingAnEntry(): void
    {
        $response = $this->postJson('/modules/extensions', [
            'name' => str_repeat('x', 256),
        ]);
        $body = $this->json($response);

        $this->assertSame(400, $response->getStatusCode());
        $this->assertSame('failure', $body['status']);
        $this->assertSame('VALIDATION_ERROR', $body['code']);
        $this->assertArrayHasKey('name', $body['errors']);
    }

    public function testRejectsInvalidModuleDataWhenUpdatingAnEntry(): void
    {
        $extension = Module::FromName('extensions')->first();
        $this->assertNotNull($extension);

        $response = $this->request('PUT', '/modules/extensions/' . $extension->getKey(), [
            'name' => str_repeat('x', 256),
        ]);
        $body = $this->json($response);

        $this->assertSame(400, $response->getStatusCode());
        $this->assertSame('failure', $body['status']);
        $this->assertSame('VALIDATION_ERROR', $body['code']);
        $this->assertArrayHasKey('name', $body['errors']);
    }
}
