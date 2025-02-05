<?php

namespace App\Http\Controllers;

use App\Models\Payments as ModelPayments;

class Payments {
    public static function show(int $id) {
        ModelPayments::show($id);
    }
}