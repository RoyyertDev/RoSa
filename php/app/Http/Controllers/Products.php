<?php 

namespace App\Http\Controllers;

use App\Models\Products as ModelProducts;

class Products
{
    public static function show() {
        ModelProducts::show();
    }
    public static function save($dates) {
        ModelProducts::save($dates);
    }
    public static function saveProductItems(Array $dates) {
        ModelProducts::saveProductItems($dates);
    }
    public static function showProductItems(int $dates) {
        ModelProducts::showProductItems($dates);
    }
    public static function find(int $id) {
        ModelProducts::find($id);
    }
    public static function update(Array $dates, int $id) {
        ModelProducts::update($dates, $id);
    }
    public static function delete(int $id) {
        ModelProducts::delete($id);
    }
}