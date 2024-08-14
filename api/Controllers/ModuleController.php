<?php

namespace App\Controllers;

use App\Framework\App;
use App\Framework\GET;
use App\Framework\POST;
use App\Framework\PUT;
use App\Framework\StringUtils;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Validator;
use Slim\Http\Request;
use Slim\Http\Response;

class ModuleController
{
    #[GET('/modules/{moduleName}')]
    function index(Request $request, Response $response, array $args)
    {
        $moduleName = $args['moduleName'];
        $moduleBuilder = $this->findBuilder($moduleName);
        if (isset($moduleBuilder)) {
            $entries = $moduleBuilder->get();
            return $response->withJson($entries);
        } else {
            return $response->withJson([
                'error' => 'CLIENT_ERROR',
                'error_msg' => 'Invalid module name'
            ]);
        }
    }

    #[GET('/modules/{moduleName}/{id}')]
    function get(Request $request, Response $response, array $args)
    {
        $id = $args['id'];
        $moduleName = $args['moduleName'];
        $moduleBuilder = $this->findBuilder($moduleName);
        if (isset($moduleBuilder)) {
            $entry = $moduleBuilder->find($id);
            return $response->withJson($entry);
        } else {
            return $response->withJson([
                'error' => 'CLIENT_ERROR',
                'error_msg' => 'Invalid module name'
            ]);
        }
    }

    #[POST('/modules/{moduleName}')]
    function post(Request $request, Response $response, array $args)
    {
        $moduleName = $args['moduleName'];
        $moduleBuilder = $this->findBuilder($moduleName);
        $validator = $this->makeValidator($moduleName, $request->getParsedBody());
        if (!isset($validator) || !isset($moduleBuilder)) {
            return $response->withJson([
                'error' => 'CLIENT_ERROR',
                'error_msg' => 'Invalid module name'
            ]);
        }

        if ($validator->fails()) {
            return $response->withJson([
                'error' => 'VALIDATION_ERROR',
                'error_msg' => 'Validation failed',
                'validation_messages' => $validator->messages()
            ]);
        }

        $data = $validator->validated();
        $id = $moduleBuilder->insertGetId($data);
        return $response->withJson([
            'success' => 'CREATED',
            'id' => $id,
        ]);
    }

    #[PUT('/modules/{moduleName}/{id}')]
    function put(Request $request, Response $response, array $args)
    {
        $id = $args['id'];
        $moduleName = $args['moduleName'];
        $moduleBuilder = $this->findBuilder($moduleName);
        $validator = $this->makeValidator($moduleName, $request->getParsedBody());
        if (!isset($validator) || !isset($moduleBuilder)) {
            return $response->withJson([
                'error' => 'CLIENT_ERROR',
                'error_msg' => 'Invalid module name'
            ]);
        }

        if ($validator->fails()) {
            return $response->withJson([
                'error' => 'VALIDATION_ERROR',
                'error_msg' => 'Validation failed',
                'validation_messages' => $validator->messages()
            ]);
        }

        $data = $validator->validated();
        $moduleBuilder->find($id)->update($data);
        return $response->withJson([
            'success' => 'UPDATED',
        ]);
    }

    private function findBuilder(string $moduleName): Builder|Model|null
    {
        $moduleName = trim($moduleName);
        $model = $this->findModel($moduleName);
        if (isset($model)) {
            return $model;
        } else if (App::database()->getSchemaBuilder()->hasTable($moduleName)) {
            return App::database()->table($moduleName);
        } else {
            return null;
        }
    }


    private function makeValidator(string $moduleName, array $data): Validator|null
    {
        $model = $this->findModel($moduleName);
        if ($model) {
            $validator = $model->validate($data);
            return $validator;
        } else {
            return null;
        }
    }

    private function findModel($moduleName): Model|null
    {
        $moduleName = trim($moduleName);
        $className = StringUtils::singularize($moduleName);
        $className = StringUtils::snakeToPascalCase($className);
        $modelClass = "App\\Models\\$className";
        if (class_exists($modelClass)) {
            return new $modelClass();
        } else {
            return null;
        }
    }
}