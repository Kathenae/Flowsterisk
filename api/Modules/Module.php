<?php

namespace Api\Modules;

use Api\Exceptions\UnknownModuleException;
use Api\Framework\StringUtils;
use Api\Framework\Validation;
use Api\Models\OmbuModel;
use Api\Modules\Data\DestinationData;
use Illuminate\Validation\Validator;
use Illuminate\Support\Str;

class Module extends OmbuModel
{
    private ?string $moduleName = null;

    private static array $moduleNames = [
        'inbound_routes',
        'extensions',
        'announcements',
        'dynamic_destinations',
        'ivrs',
        'custom_applications',
        'custom_destinations',
        'custom_contexts',
        'parking_lots',
        'callbacks',
        'ring_groups',
        'queues',
        'outbound_routes',
        'time_conditions',
        'languages',
        'nightmodes',
        'trunks',
    ];


    /**
     * Some modules are named to with diferrent names in the 
     * ombu_modules table from what their actual corresponding
     * database table is named, so this is a quick hack way to resolve that,
     * note we already cover singular/plurar, this is to cover for 
     * significant semantic diferrences
     * 
     */
    protected static array $moduleAliases = [
        'preannoun' => 'announcements',
        'custom_app' => 'custom_applications',
        'custom_dest' => 'custom_destinations',
        'parking' => 'parking_lots',
    ];

    private $destinationColumnsMeta = [
        'destination_id',
        'hangup_destination_id',
        'match_destination_id',
        'mismatch_destination_id',
        'normal_destination_id',
        'override_destination_id',
        'fax_destination_id',
        'invalid_destination_id',
        'timeout_destination_id',
    ];

    public static function getModuleNames()
    {
        return self::$moduleNames;
    }

    public static function isValidModuleName(string $name)
    {
        $name = self::resolveModuleName($name);
        return in_array($name, self::$moduleNames, true);
    }

    public static function FromName(string $name): static
    {
        $name = self::resolveModuleName($name);

        if (self::isValidModuleName($name) == false) {
            throw new UnknownModuleException($name);
        }

        $modelClass = self::moduleNameToClassName($name);
        if (class_exists($modelClass)) {
            return new $modelClass();
        }

        $module = new static();
        $module->moduleName = $name;
        return $module;
    }

    public static function moduleNameToClassName(string $name)
    {
        $name = self::resolveModuleName($name);
        $className = StringUtils::singularize($name);
        $className = StringUtils::snakeToPascalCase($className);
        $modelClass = "Api\\Modules\\$className";
        return $modelClass;
    }

    private static function resolveModuleName(string $name): string
    {
        $name = trim($name);
        $name = self::$moduleAliases[$name] ?? $name;

        if (in_array($name, self::$moduleNames, true)) {
            return $name;
        }

        $pluralName = Str::pluralStudly($name);
        return in_array($pluralName, self::$moduleNames, true) ? $pluralName : $name;
    }

    public function getId()
    {
        return $this->attributes[$this->getKeyName()];
    }

    public function getLabel()
    {
        return $this->getModuleName();
    }

    public function newInstance($attributes = [], $exists = false)
    {
        $model = parent::newInstance($attributes, $exists);

        if (isset($this->moduleName)) {
            $model->moduleName = $this->moduleName;
        }

        return $model;
    }

    public function getTable()
    {
        if (isset($this->moduleName)) {
            return $this->table ?? 'ombu_' . Str::snake(Str::pluralStudly($this->getModuleName()));
        }
        return $this->table ?? 'ombu_' . Str::snake(Str::pluralStudly(class_basename($this)));
    }

    public function getKeyName()
    {
        if ($this->moduleName != null) {
            $module_name = Str::singular($this->getModuleName());
            return $this->primaryKey ?? Str::snake(Str::studly($module_name)) . '_id';
        }
        return $this->primaryKey ?? Str::snake(Str::studly(class_basename($this))) . '_id';
    }

    public function getModuleName()
    {
        if ($this->moduleName != null) {
            return Str::snake(Str::pluralStudly(trim($this->moduleName)));
        }
        return Str::snake(Str::pluralStudly(class_basename($this)));
    }

    public function toArray()
    {
        return [
            ...parent::toArray(),
            "_node" => [
                'type' => $this->getModuleName(),
                'key_name' => $this->getKeyName(),
                'edges' => $this->getDestinationData(),
            ]
        ];
    }

    /**
     * @return DestinationData[]
     */
    public function getDestinationData(): array
    {
        $destinationData = $this->extractColumnsIfExists($this->destinationColumnsMeta, $this->attributes);
        foreach ($destinationData as $column => $destination) {
            $sql = "SELECT 
                        d.id, 
                        d.category_id, 
                        m.name AS module_name, 
                        d.module_id AS module_id 
                    FROM ombu_destinations AS d 
                    LEFT JOIN ombu_modules AS m 
                        ON d.module_id = m.module_id 
                    WHERE d.id = ?";
            $result = $this->getConnection()->select($sql, [$destination->destinationId]);
            if (!empty($result)) {
                $destination->moduleName = self::resolveModuleName($result[0]->module_name);
                $destination->moduleId = (string) $result[0]->module_id;
            }
        }
        return $destinationData;
    }

    private function extractColumnsIfExists(array $column_names, array $attributes)
    {
        $result = [];
        foreach ($column_names as $column) {
            if (key_exists($column, $attributes)) {
                $result[$column] = new DestinationData($attributes[$column], $column);
            }
        }
        return $result;
    }

    public function validate(array $data): Validator
    {
        return Validation::make($data, []);
    }
}
