<?php 

namespace App\Http\Controllers;

use App\Models\Products as ModelProducts;

class Products
{
    public static function show() {
        ModelProducts::show();
    }
    public static function save(Array $dates) {
        ModelProducts::save($dates);
    }
    public static function saveProductItems(Array $dates) {
        ModelProducts::saveProductItems($dates);
    }
    public static function showProductItems(int $dates) {
        ModelProducts::showProductItems($dates);
    }
}