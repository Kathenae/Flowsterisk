<?php

namespace Api\Modules;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Validation\Validator;

abstract class BaseModule extends Model {

    protected $connection = 'modules';

    protected $primaryKey = null;

    public abstract function validate(Array $data) : Validator;

    public function getTable() {
        return $this->table ?? 'ombu_' . Str::snake(Str::pluralStudly(class_basename($this)));
    }

    public function getKeyName() {
        return $this->primaryKey ?? Str::snake(Str::studly(class_basename($this))) . '_id';
    }
}