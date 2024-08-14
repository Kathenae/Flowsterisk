<?php

namespace App\Models;

use App\Framework\Validation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OmbuExtension extends Model {
    use HasFactory;
    protected $primaryKey = 'extension_id';
    protected $hidden = [
        'features_password',
        'portal_password',
    ];

    public function validate($data) {

        $validator = Validation::make($data, [
            'name' => 'max:255',
        ]);
        return $validator;
    }
}