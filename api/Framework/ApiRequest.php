<?php

namespace Api\Framework;
use Api\Framework\Validation;
use Slim\Http\Request;

class ApiRequest extends Request {
    
    public function validate(array $rules) {
        $validation = Validation::make($this->getParsedBody(), $rules);
        return $validation;
    }
}