<?php

namespace App\Models;

use Config\BD;
use PDOException;

class Messages {
    public static function save(Array $dates) { 
        $conn = BD::connect();
        $sql = "INSERT INTO messages (fk_chats, fk_author, date, content) VALUES (:fk_chats, :fk_author, :date, :content)";    
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute($dates);
            $response = [
                'status' => "success",
                'message' => "Mensaje registrado exitosamente"
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