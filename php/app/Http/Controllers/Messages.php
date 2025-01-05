<?php 

namespace App\Http\Controllers;

use App\Models\Messages as ModelMessages;

class Messages {
    public static function save(Array $dates) {
        ModelMessages::save($dates);
    }
}