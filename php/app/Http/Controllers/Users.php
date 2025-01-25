<?php 

namespace App\Http\Controllers;

use App\Models\Users as ModelUsers;

class Users {
    public static function save(Array $dates){
        if($dates['password'] != $dates['password_confirm']){
            // echo "<script>alert('Las contraseñas no coinciden');</script>";
            // echo "<script>window.location.href = './register';</script>";
            echo 'Las contraseñas no coinciden';
        } else {
            $dates['password'] = password_hash($dates['password'], PASSWORD_DEFAULT);
            ModelUsers::save(array_diff_key($dates, ['password_confirm' => null]));
        }
    }

    public static function login(Array $dates){
        ModelUsers::login($dates);
    }

    public static function show(){
        ModelUsers::show();
    }

    public static function find(int $id){
        ModelUsers::find($id);
    }

    public static function update(Array $dates, int $id){
        ModelUsers::update($dates, $id);
    }
}