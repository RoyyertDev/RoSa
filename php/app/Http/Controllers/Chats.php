<?php

namespace App\Http\Controllers;

use App\Models\Chats as ModelChats;

class Chats
{
    public static function save(Array $dates) {
        ModelChats::save($dates);
    }

    public static function show(Array $dates) {
        ModelChats::show($dates);
    }
}