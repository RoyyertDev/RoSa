<?php 

namespace App\Http\Controllers;

use App\Models\Categories as ModelCategories;

class Categories
{
    public static function show()
    {
        ModelCategories::show();
    }
}