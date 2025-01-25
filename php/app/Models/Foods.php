<?php 

namespace App\Models;

use Config\BD;
use PDOException;

class Foods {
    public static function show() {
        $conn = BD::connect();
        $sql = "SELECT * FROM foods";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $foods = $stmt->fetchAll();
            $response = $foods;
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
    public static function save(Array $dates) { 
        $conn = BD::connect();
        $sql = "INSERT INTO foods (fk_categories, name) VALUES (:fk_categories, :name)";    
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute($dates);
            $response = [
                'status' => "success",
                'message' => "Menu registrado exitosamente"
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
    public static function find(int $id) {
        $conn = BD::connect();
        $sql = "SELECT * FROM foods WHERE id = :id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['id' => $id]);
            $food = $stmt->fetch();
            $response = $food;
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
        $sql = "UPDATE foods SET fk_categories = :fk_categories, name = :name WHERE id = :id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute($dates + ['id' => $id]);
            $response = [
                'status' => "success",
                'message' => "Menu actualizado exitosamente"
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
        $sql = "DELETE FROM foods WHERE id = :id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['id' => $id]);
            $response = [
                'status' => "success",
                'message' => "Menu eliminado exitosamente"
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