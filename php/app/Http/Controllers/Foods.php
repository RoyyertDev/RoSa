<?php 

namespace App\Http\Controllers;

use App\Models\Foods as ModelFoods;

class Foods {
    public static function show(){
        ModelFoods::show(); 
    }
    public static function save(Array $dates){
        ModelFoods::save($dates); 
    }
    public static function find(int $id){
        ModelFoods::find($id);
    }
    public static function update(Array $dates, int $id){
        ModelFoods::update($dates, $id); 
    }
    public static function delete(int $id){
        ModelFoods::delete($id); 
    }
}