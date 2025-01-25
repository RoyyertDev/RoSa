<?php

namespace App\Models;

use Config\BD;
use PDOException;

class Provinces {
    public static function show(Int $id) {
        $conn = BD::connect();
        $sql = "SELECT * FROM provinces WHERE fk_countries = :fk_countries";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['fk_countries' => $id]);
            $provinces = $stmt->fetchAll();
            $response = $provinces;
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