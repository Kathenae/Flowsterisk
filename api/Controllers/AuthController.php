<?php

namespace Api\Controllers;
use Api\Framework\ApiRequest;
use Api\Framework\ApiResponse;
use Api\Framework\GET;
use Api\Framework\POST;
use Api\Models\User;
use Api\Services\Encryption;

class AuthController {

    #[POST('/auth')]
    public function authenticate(ApiRequest $request, ApiResponse $response) {

        $validation = $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);
        
        if ($validation->fails()) {
            return $response->validationError($validation);
        }

        $username = $validation->getValue('username');
        $password = $validation->getValue('password');

        $user = User::where('username', $username)->first();
        if(empty($user)){
            return $response->failure('INVALID_CREDENTIALS')->withStatus(401, 'INVALID USERNAME');
        }
        
        if(!$user->passwordMatches($password)){
            return $response->failure('INVALID_CREDENTIALS')->withStatus(401, 'INVALID PASSWORD');
        }

        $token = Encryption::encodeJWT($user->toArray());
        return $response->success([
            'token_type' => 'jwt',
            'token' => $token,
        ]);
    }
}