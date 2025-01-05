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

    public static function login(Array $dates){
        $conn = BD::connect();
        $sql = "SELECT * FROM users WHERE email = :email";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute([
                'email' => $dates['email'],
            ]);
            $user = $stmt->fetch();
            if($user && password_verify($dates['password'], $user['password'])){
                $response = [
                    'status' => "success",
                    'userSession' => [
                        'id' => $user['id'],
                        'names' => $user['names'],
                    ],
                ];
            } else {
                $response = [
                    'status' => "error",
                    'message' => "Credenciales incorrectas"
                ];
            }
        } catch (PDOException $e) {
            $response = [
                'status' => "error",
                'message' => "Error de conexion: " . $e->getMessage()
            ];
        }
        $conn = null;
        echo json_encode($response);
    }

    public static function show(){
        $conn = BD::connect();
        $sql = "SELECT * FROM users";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll();
            echo json_encode($users);
        } catch (PDOException $e) {
            echo "Error de conexion: " . $e->getMessage();
        }
    }
}
