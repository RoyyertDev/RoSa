<?php 

namespace App\Http\Controllers;

use App\Models\Items as ModelItems;

class Items
{
    public static function save(Array $dates)
    {
        ModelItems::save($dates);
    }

    public static function show()
    {
        ModelItems::show();
    }
    public static function getItemForIdFood(int $id)
    {
        ModelItems::getItemForIdFood($id);
    }
}