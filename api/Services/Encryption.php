<?php
namespace Api\Services;

use DateTimeImmutable;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class Encryption {

    /**
     * Create a password hash using the sha512 algo. This function is designed specifically to be
     * compatible with the underlying PBX system we're using
     * 
     * @param string $password The password to hash
     * @param string $id The id of the user
     * @return string Binary hash of the password
     */
    public static function passwordHash(string $password, string $id) {
        $algo = 'sha512';
        $salt = $_ENV['OMBU_PASSWORD_SALT'];
        return hash($algo, $salt . md5($id ?? '') . $password, true);
    }

    /**
     * Encode the given payload as a JWT
     * 
     * @param array $data
     * @return string the encoded token
     */
    public static function encodeJWT(array $payload) {
        $key = $_ENV['APP_SECRET'];
        $algo = 'HS256';
        $date = new DateTimeImmutable();
        $expiresAt = $date->modify('+1 year')->getTimestamp();
        return JWT::encode([
            'iat' => $date->getTimestamp(),
            'iss' => $_ENV['APP_NAME'],
            'nbf' => $date->getTimestamp(),
            'exp' => $expiresAt,
            ...$payload,
        ], $key, $algo);
    }

    
    /**
     * Decode the given token as a JWT
     * 
     * @param string $token
     * @return \stdClass|null
     */
    public static function decodeJWT(string $token) {
        try{
            $key = $_ENV['APP_SECRET'];
            $algo = 'HS256';
            return JWT::decode($token, new Key($key, $algo));
        } catch(Exception $e) {
            return null;
        }
    }
}