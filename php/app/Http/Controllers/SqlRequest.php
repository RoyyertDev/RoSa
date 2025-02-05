<?php 

namespace App\Http\Controllers;

use App\Models\SqlRequest as ModelSqlRequest;

class SqlRequest {
    public static function save($dates) {
        ModelSqlRequest::save($dates);
    }
}