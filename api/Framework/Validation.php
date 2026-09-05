<?php

namespace Api\Framework;

use Illuminate\Validation\Factory;
use Illuminate\Filesystem;
use Illuminate\Translation;

class Validation {
    public static function make($data, $rules, $messages = [], $attributes = []) {
        $default_messages = require(__DIR__ . '/../Messages/en/validation.php');
        $filesystem = new Filesystem\Filesystem();
        $fileLoader = new Translation\FileLoader($filesystem, '');
        $translator = new Translation\Translator($fileLoader, 'en_US');
        $factory = new Factory($translator);
        return $factory->make($data, $rules, array_merge($default_messages, $messages), $attributes);
    }
}