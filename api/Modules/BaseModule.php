<?php

namespace Api\Modules;
use Api\Models\OmbuModel;
use Illuminate\Validation\Validator;

abstract class BaseModule extends OmbuModel {
    public abstract function validate(Array $data) : Validator;
}