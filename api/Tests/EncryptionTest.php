<?php
use Api\Services\Encryption;
use PHPUnit\Framework\TestCase;

final class EncryptionTest extends TestCase {
    public function testCanHashPasswordAsExpected() {
        $expectedHash = "49263916918619d7e6215e8b45426b2096443e8a1958b35500696bcac648071681a60f0ceb4ff31a16a3a6e3723bf64200cb747c02b07bf43ab1ec32d94070f2";
        $this->assertEquals(Encryption::passwordHash("Password321", 1), hex2bin($expectedHash));
    }
}