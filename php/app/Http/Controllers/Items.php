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
    public static function find(int $id){
        ModelItems::find($id);
    }
    public static function update(Array $dates, int $id){
        ModelItems::update($dates, $id);
    }
    public static function delete(int $id){
        ModelItems::delete($id);
    }
}