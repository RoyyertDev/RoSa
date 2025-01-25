<?php

namespace App\Http\Controllers;

use App\Models\Countries as ModelCountries;

class Countries {
    public static function show() {
        ModelCountries::show();
    }
}