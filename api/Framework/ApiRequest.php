<?php

namespace Api\Framework;
use Api\Framework\Validation;
use Slim\Http\Request;

class ApiRequest extends Request
{

    public function getClientIpAddress()
    {
        foreach (App::settings("address_stack") as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                foreach (explode(',', $_SERVER[$key]) as $IPaddress) {
                    $IPaddress = trim($IPaddress); // Just to be safe

                    if (
                        filter_var(
                            $IPaddress,
                            FILTER_VALIDATE_IP,
                            FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE
                        )
                        !== false
                    ) {

                        return $IPaddress;
                    }
                }
            }
        }
    }

    private function isLoopback(string $address)
    {
        return $address == "127.0.0.1" || $address == "::1" || $address == "0:0:0:0:0:0:0:1";
    }
    public function validate(array $rules)
    {
        $validation = Validation::make($this->getParsedBody(), $rules);
        return $validation;
    }
}