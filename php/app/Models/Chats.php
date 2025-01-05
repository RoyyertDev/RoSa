<?php 

namespace App\Models;

use Config\BD;
use PDOException;

class Chats {
    public static function save(Array $dates) { 
        $conn = BD::connect();
        $sql = "INSERT INTO chats (fk_users, title, date) VALUES (:fk_user, :title, :date)";    
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute($dates);
            $response = [
                'status' => "success",
                'message' => "Chat creado exitosamente",
                'id' => $conn->lastInsertId()
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