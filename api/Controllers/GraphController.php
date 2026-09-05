<?php

namespace Api\Controllers;

use Api\Framework\ApiRequest;
use Api\Framework\ApiResponse;
use Api\Framework\GET;
use Api\Modules\Module;

class GraphController {

    #[GET('/graph/{route_id}')]
    public function index(ApiRequest $request, ApiResponse $response, array $args) {
        $route_id = $args['route_id'];
        $module = Module::FromName('inbound_routes');
        $route = $module->find($route_id);
    }

    // TODO: starting from the $rootModule, construct a graph so that we can ultimately use it in the react frontend
    private function graph(Module $rootModule): array {

    }
}