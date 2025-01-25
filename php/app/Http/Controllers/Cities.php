<?php 

namespace App\Http\Controllers;

use App\Models\Cities as ModelCities;

class Cities {
    public static function show(int $id) {
        ModelCities::show($id);
    }
}