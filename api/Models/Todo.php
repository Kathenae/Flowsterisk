<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Schema\Blueprint;

class Todo extends Model
{
    protected $fillable = ['title', 'description', 'isComplete'];
}
