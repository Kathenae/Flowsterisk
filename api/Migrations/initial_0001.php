<?php
use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;

return new class {
    static function up()
    {
        Capsule::schema()->create('todos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('description');
            $table->boolean('isComplete');
        });
    }

    static function down()
    {
        Capsule::schema()->drop('todos');
    }
};