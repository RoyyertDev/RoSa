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
        $sql = "SELECT users.*, user_details.fk_role FROM users JOIN user_details ON users.id = user_details.fk_user WHERE users.email = :email";
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
                        'role' => $user['fk_role'],
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

    public static function find(int $id){
        $conn = BD::connect();
        $sql = "SELECT * FROM users WHERE id = :id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['id' => $id]);
            $user = $stmt->fetch();
            unset($user['password']);
            $response = $user;
        } catch (PDOException $e) {
            $response = [
                'status' => "error",
                'message' => "Error de conexion: " . $e->getMessage(),
                'error' => $e
            ];
        }
        $conn = null;
        echo json_encode($response);
    }

    public static function update(Array $dates, int $id){
        $conn = BD::connect();
        $sql = "UPDATE users SET names = :names, surnames = :surnames, identification_document = :identification_document, email = :email, sex = :sex WHERE id = :id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute($dates + ['id' => $id]);
            $response = [
                'status' => "success",
                'message' => "Usuario actualizado exitosamente"
            ];
        } catch (PDOException $e) {
            $response = [
                'status' => "error",
                'message' => "Error de conexion: " . $e->getMessage(),
                'error' => $e
            ];
        }
        $conn = null;
        echo json_encode($response);
    }
}
