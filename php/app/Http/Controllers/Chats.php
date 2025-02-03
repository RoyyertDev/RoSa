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
    public static function delete(int $id) {
        ModelChats::delete($id);
    }
    public static function findMessages(int $id) {
        ModelChats::findMessages($id);
    }
}