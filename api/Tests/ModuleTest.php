<?php
use Api\Framework\StringUtils;
use Api\Modules\Module;
use Api\Services\Encryption;
use PHPUnit\Framework\TestCase;
use function PHPUnit\Framework\assertFalse;
use function PHPUnit\Framework\assertNotNull;
use function PHPUnit\Framework\assertTrue;

final class ModuleTest extends TestCase
{

    public function testCanCreateModulesFromName()
    {
        foreach (Module::getModuleNames() as $name) {
            $module = Module::FromName($name);
            assertNotNull($module);
        }
    }

    public function testResolvesCorrectModuleClass()
    {
        foreach (Module::getModuleNames() as $name) {
            $module = Module::FromName($name);
            $baseClass = Module::class;
            $modelClass = $module::class;
            $expectedClass = Module::moduleNameToClassName($name);

            // if expected class exists, module is expected to use that, otherwise its expected to use the base module class
            if(class_exists($expectedClass)) {
                assertTrue($modelClass == $expectedClass, "Module \"$name\" class \"$modelClass\" did not resolve to the expected more specific class \"$expectedClass\"");
            } else {
                assertTrue($modelClass == Module::class, "Module  \"$name\" class \"$modelClass\" did not resolve to the base class \"$baseClass\"");
            }
        }
    }

    public function testResolvesCorrectTableName()
    {
        foreach (Module::getModuleNames() as $name) {
            $module = Module::FromName($name);
            assertNotNull($module, "Module Not Found for module \"$name\"");
            $table = $module->getTable();
            assertTrue($module->getConnection()->getSchemaBuilder()->hasTable($table), "Module resolved non existent table \"$table\"");
        }
    }

    public function testResolvesCorrectPrimaryKey()
    {
        foreach (Module::getModuleNames() as $name) {
            $module = Module::FromName($name);
            assertNotNull($module, "Module Not Found for module \"$name\"");
            $table = $module->getTable();
            $keyName = $module->getKeyName();
            assertTrue($module->getConnection()->getSchemaBuilder()->hasColumn($table, $keyName), "Module table \"$table\" resolved a non existent primary key column \"$keyName\"");
        }
    }
}