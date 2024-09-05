<?php

namespace Api\Modules;

use Api\Framework\Validation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Validation\Validator;

class Extension extends BaseModule {
    use HasFactory;
    
    protected $hidden = [
        'features_password',
        'portal_password',
    ];

    public function validate(array $data) : Validator {

        $validator = Validation::make($data, [
            'name' => 'max:255',
        ]);
        return $validator;
    }
}