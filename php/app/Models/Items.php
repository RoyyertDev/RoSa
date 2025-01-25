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

    public static function find (int $id) {
        $conn = BD::connect();
        $sql = "SELECT * FROM items WHERE id = :id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['id' => $id]);
            $item = $stmt->fetch();
            $response = $item;
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
    public static function update(Array $dates, int $id) {
        $conn = BD::connect();
        $sql = "UPDATE items SET name = :name, content_gr = :content_gr, extra = :extra, prize_unit = :prize_unit, fk_foods = :fk_foods WHERE id = :id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute($dates + ['id' => $id]);
            $response = [
                'status' => "success",
                'message' => "Rubro actualizado exitosamente"
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
        $sql = "DELETE FROM items WHERE id = :id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['id' => $id]);
            $response = [
                'status' => "success",
                'message' => "Rubro eliminado exitosamente"
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