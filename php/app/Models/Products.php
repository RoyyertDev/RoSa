<?php

namespace App\Models;

use Config\BD;
use PDOException;
class Products {
    public static function show() {
        $conn = BD::connect();
        $sql = "SELECT * FROM products";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchAll();
            $response = $products;
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
        $sql = "INSERT INTO `products`(`fk_foods`, `name`, `description`, `prize`, `image`) VALUES (:fk_foods, :name, :description, :prize, :image)";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute($dates);
            $response = [
                'status' => "success",
                'message' => "Producto registrado exitosamente"
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
    public static function saveProductItems(Array $dates) {
        $fk_product = $dates['fk_products'];
        $items = $dates['items'];
        $conn = BD::connect();
        $sql = "INSERT INTO product_item(fk_product, fk_item) VALUES (:fk_product, :fk_item)";
        try {
            $stmt = $conn->prepare($sql);
            foreach ($items as $item) {
                $stmt->execute([
                    'fk_product' => $fk_product,
                    'fk_item' => $item[0]
                ]);
            }
            $response = [
                'status' => "success",
                'message' => "Items registrados exitosamente"
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
    public static function showProductItems(int $fk_product) {
        $conn = BD::connect();
        $sql = "SELECT product_item.*, name FROM product_item JOIN items ON product_item.fk_item = items.id WHERE fk_product = :fk_product"; 
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['fk_product' => $fk_product]);
            $productItems = $stmt->fetchAll();
            $response = $productItems;
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
        $sql = "SELECT * FROM products WHERE id = :id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['id' => $id]);
            $product = $stmt->fetch();
            $response = $product;
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
        $sql = "UPDATE products SET fk_foods = :fk_foods, name = :name, description = :description, prize = :prize WHERE id = :id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute($dates + ['id' => $id]);
            $response = [
                'status' => "success",
                'message' => "Producto actualizado exitosamente"
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
        $sql = "DELETE FROM products WHERE id = :id";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['id' => $id]);
            $response = [
                'status' => "success",
                'message' => "Producto eliminado exitosamente"
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