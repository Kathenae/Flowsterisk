<?php

namespace Api\Framework;
use Api\Framework\Validation;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Psr7\Headers;
use Slim\Psr7\Request;

class ApiRequest extends Request
{
    public static function fromRequest(ServerRequestInterface $request): self
    {
        $apiRequest = new self(
            $request->getMethod(),
            $request->getUri(),
            new Headers($request->getHeaders()),
            $request->getCookieParams(),
            $request->getServerParams(),
            $request->getBody(),
            $request->getUploadedFiles()
        );

        $apiRequest = $apiRequest
            ->withQueryParams($request->getQueryParams())
            ->withParsedBody($request->getParsedBody());

        foreach ($request->getAttributes() as $name => $value) {
            $apiRequest = $apiRequest->withAttribute($name, $value);
        }

        return $apiRequest;
    }


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