<?php 

Namespace App\Models;

use Config\BD;
use PDOException;

class Users {
    public static function save(Array $input){
        $conn = BD::connect();
        $sql = "INSERT INTO users (names, surnames, identification_document, email, password, sex) VALUES (:names, :surnames, :identification_document, :email, :password, :sex)";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute($input);
            $response = [
                'status' => "success",
                'message' => "Usuario registrado exitosamente"
            ];
        } catch (PDOException $e) {
            $response = [
                'status' => "error",
                'message' => "Error de conexion: " . $e->getMessage()
            ];
        }
        $conn = null;
        echo json_encode($response);
    }

    public static function login(Array $input){
        $conn = BD::connect();
        $sql = "SELECT * FROM users WHERE email = :email AND identification_document = :identification_document";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute([
                'email' => $input['email'],
                'identification_document' => $input['identification_document'],
            ]);
            $user = $stmt->fetch();
            if($user && password_verify($input['password'], $user['password'])){
                session_start();
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['names'];
                $_SESSION['user_surnames'] = $user['surnames'];
                $_SESSION['user_identification_document'] = $user['identification_document'];
                echo "<script>alert('Inicio de sesión exitoso');</script>";
                echo "<script>window.location.href = './dashboard';</script>";
            } else {
                echo "<script>alert('Email o contraseña incorrectos');</script>";
                echo "<script>window.location.href = './login';</script>";
            }
        } catch (PDOException $e) {
            echo "Error de conexion: " . $e->getMessage();
        }
    }
}
