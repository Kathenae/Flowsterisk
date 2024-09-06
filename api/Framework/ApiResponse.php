<?php

namespace Api\Framework;
use Illuminate\Validation\Validator;
use Slim\Http\Response;

class ApiResponse extends Response {
    
    public function success(array $data = []) {
        return $this->withJson([
            'status' => 'success',
            'data'=> $data,
        ]);
    }

    public function validationError(Validator $validation) {
        return $this->failure('VALIDATION_ERROR', $validation->errors()->toArray())->withStatus(400, 'Validation Error');
    }

    public function failure(string $code, array $errors = null) {
        return $this->withJson([
            'status' => 'failure',
            'code' => $code,
            'errors' => $errors,
        ]);
    }
}