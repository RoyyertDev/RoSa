<?php 

namespace App\Http\Controllers;

use App\Models\UserDetails as ModelUserDetails;

class UserDetails {
    public static function show(int $id) {
        ModelUserDetails::show($id);
    }

    public static function create(Array $dates) {
        ModelUserDetails::create($dates);
    }

    public static function update(Array $dates) {
        ModelUserDetails::update($dates);
    }
}