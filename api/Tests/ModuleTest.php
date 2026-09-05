<?php
use Api\Exceptions\UnknownModuleException;
use Api\Modules\Module;
use PHPUnit\Framework\TestCase;
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
            $this->assertTrue($module->getConnection()->getSchemaBuilder()->hasColumn($table, $keyName), "Module table \"$table\" resolved a non existent primary key column \"$keyName\"");
        }
    }

    public function testRejectsUnknownModuleNames()
    {
        $this->expectException(UnknownModuleException::class);
        Module::FromName('totally_not_a_module');
    }

    public function testAcceptsSingularAndPluralModuleNames()
    {
        $this->assertTrue(Module::isValidModuleName('extension'));
        $this->assertTrue(Module::isValidModuleName('extensions'));
        $this->assertTrue(Module::isValidModuleName('dynamic_destination'));
        $this->assertTrue(Module::isValidModuleName('dynamic_destinations'));
        $this->assertFalse(Module::isValidModuleName('unknown_module'));
    }

    public function testModuleNameToClassNameResolvesExpectedClasses()
    {
        $this->assertSame('Api\\Modules\\Extension', Module::moduleNameToClassName('extensions'));
        $this->assertSame('Api\\Modules\\DynamicDestination', Module::moduleNameToClassName('dynamic_destinations'));
        $this->assertSame('Api\\Modules\\CustomContext', Module::moduleNameToClassName('custom_contexts'));
    }

    public function testGetDestinationDataOnlyReturnsPresentDestinationColumns()
    {
        $module = Module::FromName('extensions');
        $module->setAttribute('extension_id', 42);
        $module->setAttribute('destination_id', 10);
        $module->setAttribute('hangup_destination_id', 20);
        $module->setAttribute('not_a_destination', 999);

        $destinationData = $module->getDestinationData();

        $this->assertArrayHasKey('destination_id', $destinationData);
        $this->assertArrayHasKey('hangup_destination_id', $destinationData);
        $this->assertArrayNotHasKey('not_a_destination', $destinationData);
        $this->assertSame(10, $destinationData['destination_id']->destinationId);
        $this->assertSame('destination_id', $destinationData['destination_id']->label);
    }

    public function testNewInstancePreservesModuleName()
    {
        $module = Module::FromName('dynamic_destinations');
        $clonedModule = $module->newInstance([], false);

        $this->assertSame($module->getModuleName(), $clonedModule->getModuleName());
        $this->assertSame($module->getTable(), $clonedModule->getTable());
    }

    public function testTrimsWhitespaceWhenResolvingModuleNames()
    {
        $module = Module::FromName('  extensions  ');

        $this->assertTrue(Module::isValidModuleName('  extensions  '));
        $this->assertSame('extensions', $module->getModuleName());
        $this->assertSame('extensions', $module->getModuleName());
    }

    public function testUsesExplicitTableAndPrimaryKeyOverrides()
    {
        $module = new Module();
        $module->setTable('custom_modules');
        $module->setKeyName('custom_module_id');

        $this->assertSame('custom_modules', $module->getTable());
        $this->assertSame('custom_module_id', $module->getKeyName());
    }
}