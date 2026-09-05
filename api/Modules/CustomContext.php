<?php

namespace Api\Modules;

use Api\Framework\Validation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Validation\Validator;

class CustomContext extends Module {
    use HasFactory;
    
    public function getKeyName() {
        return 'cc_id';
    }
}