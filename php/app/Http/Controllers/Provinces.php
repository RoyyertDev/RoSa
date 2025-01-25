<?php 

namespace App\Http\Controllers;

use App\Models\Provinces as ModelProvinces;

class Provinces {
    public static function show(Int $id) {
        $provinces = ModelProvinces::show($id);
    }
}