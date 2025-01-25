<?php

namespace App\Models;

use Config\BD;
use PDOException;

class Cities {
    public static function show(int $id) {
        $conn = BD::connect();
        $sql = "SELECT * FROM cities WHERE fk_provinces = :fk_provinces";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['fk_provinces' => $id]);
            $cities = $stmt->fetchAll();
            $response = $cities;
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