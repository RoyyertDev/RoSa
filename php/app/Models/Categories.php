<?php 

namespace App\Models;

use Config\BD;
use PDOException;

class Categories
{
    public static function show()
    {
        $conn = BD::connect();
        $sql = "SELECT * FROM categories;";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $categories = $stmt->fetchAll();
            $response = $categories;
        } catch (PDOException $e) {
            $response = [
                'status' => "error",
                'message' => "Error al obtener las categorias: " . $e->getMessage(),
                'error' => $e
            ];
        }
        $conn = null;
        echo json_encode($response);
    }
}