<?php

namespace Api\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

abstract class OmbuModel extends Model {

    protected $connection = 'modules';

    protected $primaryKey = null;

    public function getTable() {
        return $this->table ?? 'ombu_' . Str::snake(Str::pluralStudly(class_basename($this)));
    }

    public function getKeyName() {
        return $this->primaryKey ?? Str::snake(Str::studly(class_basename($this))) . '_id';
    }
}