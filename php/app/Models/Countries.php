<?php

namespace App\Models;

use Config\BD;
use PDOException;

class Countries {
    public static function show() {
        $conn = BD::connect();
        $sql = "SELECT * FROM countries";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $countries = $stmt->fetchAll();
            $response = $countries;
        } catch (PDOException $e) {
            echo $e->getMessage();
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