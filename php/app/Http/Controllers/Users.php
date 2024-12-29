<?php 

namespace App\Http\Controllers;

use App\Models\Users as ModelUsers;

class Users {
    public static function save(){
        $nombre = filter_input(INPUT_POST, 'names', FILTER_UNSAFE_RAW); 
        $apellido = filter_input(INPUT_POST, 'surnames', FILTER_UNSAFE_RAW); 
        $identification_document = filter_input(INPUT_POST, 'identification_document', FILTER_SANITIZE_NUMBER_INT); 
        $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL); 
        $password = filter_input(INPUT_POST, 'password', FILTER_UNSAFE_RAW); 
        $passwordConfirm = filter_input(INPUT_POST, 'passwordConfirm', FILTER_UNSAFE_RAW); 
        $sex = filter_input(INPUT_POST, 'sex', FILTER_UNSAFE_RAW); 
        
        // Aplicar sanitización  
        $nombre = htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8'); 
        $apellido = htmlspecialchars($apellido, ENT_QUOTES, 'UTF-8'); 
        $password = htmlspecialchars($password, ENT_QUOTES, 'UTF-8'); 
        $passwordConfirm = htmlspecialchars($passwordConfirm, ENT_QUOTES, 'UTF-8');
        $sex = htmlspecialchars($sex, ENT_QUOTES, 'UTF-8');

        if($password != $passwordConfirm){
            echo "<script>alert('Las contraseñas no coinciden');</script>";
            echo "<script>window.location.href = './register';</script>";
        } else {
            $password = password_hash($password, PASSWORD_DEFAULT);
            ModelUsers::save([
                'names' => $nombre,
                'surnames' => $apellido,
                'identification_document' => $identification_document,
                'email' => $email,
                'password' => $password,
                'sex' => $sex,
            ]);
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