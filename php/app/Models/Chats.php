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

    public static function show(Array $dates) { 
        $conn = BD::connect();
        $sql = "SELECT * FROM chats WHERE fk_users = :fk_users ORDER BY id DESC";    
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute($dates);
            $response = [
                'status' => "success",
                'message' => "Chats obtenidos exitosamente",
                'chats' => $stmt->fetchAll()
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
    public static function delete(int $id) {
        $conn = BD::connect();
        $sql = "DELETE FROM chats WHERE id = :id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['id' => $id]);
            $response = [
                'status' => "success",
                'message' => "Chat eliminado exitosamente"
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
    public static function findMessages(int $id) {
        $conn = BD::connect();
        $sql = "SELECT * FROM messages WHERE fk_chats = :fk_chats ORDER BY id ASC";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['fk_chats' => $id]);
            $response = [
                'status' => "success",
                'message' => "Mensajes obtenidos exitosamente",
                'messages' => $stmt->fetchAll()
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