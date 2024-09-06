<?php

namespace Api\Models;
use Api\Services\Encryption;

class User extends OmbuModel {
    
    protected $hidden = [
        'password',
        'ga_secret',
        'uid',
        'password_hash',
    ];

    protected $appends = [
        'password_hash'
    ];

    public function getPasswordHashAttribute() {
        return bin2hex($this->password);
    }

    public function passwordMatches(string $password) {
        return bin2hex(Encryption::passwordHash($password, $this->user_id)) == $this->password_hash;
    }
}