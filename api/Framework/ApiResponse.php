<?php

namespace Api\Framework;
use Illuminate\Validation\Validator;
use Slim\Psr7\Response;

class ApiResponse extends Response {
    
    public function success(array $data = []) {
        $this->getBody()->write(json_encode([
            'status' => 'success',
            'data'=> $data,
        ]));
        return $this->withHeader('Content-Type', 'application/json');
    }

    public function validationError(Validator $validation) {
        return $this->failure('VALIDATION_ERROR', $validation->errors()->toArray())->withStatus(400, 'Validation Error');
    }

    public function failure(string $code, ?array $errors = null) {
        $this->getBody()->write(json_encode([
            'status' => 'failure',
            'code' => $code,
            'errors' => $errors,
        ]));
        return $this->withHeader('Content-Type', 'application/json');
    }
}