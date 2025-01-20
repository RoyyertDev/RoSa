<?php 

namespace App\Models;
use Config\BD;
use PDOException;

class Items {
    public static function save(Array $dates) {
        $conn = BD::connect();
        $sql = "INSERT INTO items (name, content_gr, extra, prize_unit, fk_foods) VALUES (:name, :content_gr, :extra, :prize_unit, :fk_foods)";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute($dates);
            $response = [
                'status' => "success",
                'message' => "Rubro registrado exitosamente"
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

    public static function show() {
        $conn = BD::connect();
        $sql = "SELECT * FROM items";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $items = $stmt->fetchAll();
            $response = $items;
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

    public static function getItemForIdFood(int $id)
    {
        $conn = BD::connect();
        $sql = "SELECT * FROM items WHERE fk_foods = :id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['id' => $id]);
            $items = $stmt->fetchAll();
            $response = $items;
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