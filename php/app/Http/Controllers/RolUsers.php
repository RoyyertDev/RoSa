<?php 

namespace App\Http\Controllers;

use App\Models\RolUsers as ModelRolUsers;

class RolUsers {
    public static function show() {
        ModelRolUsers::show();
    }
}