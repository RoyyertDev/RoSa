<?php 

namespace App\Models;

use Config\BD;
use PDOException;

class RolUsers {
    public static function show() {
        $conn = BD::connect();
        $sql = "SELECT * FROM rol_users";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rolUsers = $stmt->fetchAll();
            $response = $rolUsers;
        } catch (PDOException $e) {
            echo "Error de conexion: " . $e->getMessage();
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