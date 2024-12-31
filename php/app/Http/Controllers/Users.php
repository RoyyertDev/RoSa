<?php 

namespace App\Http\Controllers;

use App\Models\Users as ModelUsers;

class Users {
    public static function save(Array $dates){
        if($dates['password'] != $dates['password_confirm']){
            // echo "<script>alert('Las contraseñas no coinciden');</script>";
            // echo "<script>window.location.href = './register';</script>";
            return 'Las contraseñas no coinciden';
        } else {
            $dates['password'] = password_hash($dates['password'], PASSWORD_DEFAULT);
            ModelUsers::save(array_diff_key($dates, ['password_confirm' => null]));
        }
    }

    public static function login(){
        $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL); 
        $identification_document = filter_input(INPUT_POST, 'identification_document', FILTER_SANITIZE_NUMBER_INT); 
        $password = filter_input(INPUT_POST, 'password', FILTER_UNSAFE_RAW);
        
        // Aplicar sanitización
        $password = htmlspecialchars($password, ENT_QUOTES, 'UTF-8');

        ModelUsers::login([
            'email' => $email,
            'identification_document' => $identification_document,
            'password' => $password,
        ]);
    }
}