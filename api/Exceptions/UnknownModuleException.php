<?php

namespace Api\Exceptions;;

use Exception;

class UnknownModuleException extends Exception {
    public function __construct(string $moduleName) {
        parent::__construct("Module \"$moduleName\" is unknown");
    }
}