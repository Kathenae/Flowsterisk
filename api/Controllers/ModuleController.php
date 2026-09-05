<?php

namespace Api\Controllers;

use Api\Framework\ApiRequest;
use Api\Framework\ApiResponse;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Validator;
use Api\Framework\App;
use Api\Framework\GET;
use Api\Framework\POST;
use Api\Framework\PUT;
use Api\Framework\StringUtils;
use Api\Modules\Module;

class ModuleController
{
    #[GET('/modules/{moduleName}')]
    function index(ApiRequest $request, ApiResponse $response, array $args)
    {
        $moduleName = $args['moduleName'];
        $moduleBuilder = $this->findBuilder($moduleName);
        if (isset($moduleBuilder)) {
            $entries = $moduleBuilder->get();
            return $response->success($entries->toArray());
        } else {
            return $response->failure('MODULE_NOT_FOUND');
        }
    }

    #[GET('/modules/{moduleName}/{id}')]
    function get(ApiRequest $request, ApiResponse $response, array $args)
    {
        $id = $args['id'];
        $moduleName = $args['moduleName'];
        $moduleBuilder = $this->findBuilder($moduleName);
        if (isset($moduleBuilder)) {
            $entry = $moduleBuilder->find($id);
            return $response->success($entry->toArray());
        } else {
            return $response->failure('MODULE_NOT_FOUND');
        }
    }

    #[POST('/modules/{moduleName}')]
    function post(ApiRequest $request, ApiResponse $response, array $args)
    {
        $moduleName = $args['moduleName'];
        $moduleBuilder = $this->findBuilder($moduleName);
        $validation = $this->makeValidation($moduleName, $request->getParsedBody());
        if (!isset($validation) || !isset($moduleBuilder)) {
            return $response->failure('MODULE_NOT_FOUND');
        }

        if ($validation->fails()) {
            return $response->validationError($validation);
        }

        $data = $validation->validated();
        $id = $moduleBuilder->insertGetId($data);
        return $response->success([
            'id' => $id,
        ]);
    }

    #[PUT('/modules/{moduleName}/{id}')]
    function put(ApiRequest $request, ApiResponse $response, array $args)
    {
        $id = $args['id'];
        $moduleName = $args['moduleName'];
        $moduleBuilder = $this->findBuilder($moduleName);
        $validation = $this->makeValidation($moduleName, $request->getParsedBody());
        if (!isset($validation) || !isset($moduleBuilder)) {
            return $response->failure('MODULE_NOT_FOUND');
        }

        if ($validation->fails()) {
            return $response->validationError($validation);
        }

        $data = $validation->validated();
        $moduleBuilder->find($id)->update($data);
        return $response->success();
    }

    private function findBuilder(string $moduleName): Builder|Model|null
    {
        $moduleName = trim($moduleName);
        $tableName = 'ombu_' . $moduleName;
        $model = Module::FromName($moduleName);
        if (isset($model)) {
            return $model;
        } else if (App::database()->connection('modules')->getSchemaBuilder()->hasTable($tableName)) {
            return App::database()->connection('modules')->table($tableName);
        } else {
            return null;
        }
    }

    private function makeValidation(string $moduleName, array $data): Validator|null
    {
        $model = Module::FromName($moduleName);
        if ($model) {
            $validation = $model->validate($data);
            return $validation;
        } else {
            return null;
        }
    }
}
