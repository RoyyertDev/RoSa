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
}