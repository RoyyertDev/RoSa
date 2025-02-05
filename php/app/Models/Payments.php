<?php

namespace App\Models;

use Config\BD;
use PDOException;

class Payments {
    public static function show(int $id) {
        $conn = BD::connect();
        $sql = "SELECT 
                p.id AS payment_id,
                p.amount,
                p.date,
                sc.id AS shopping_cart_id,
                sc.date_create AS cart_date,
                u.names,
                u.surnames
            FROM 
                payments p
            JOIN 
                shopping_carts sc ON p.fk_shopping_carts = sc.id
            JOIN 
                users u ON sc.fk_user = u.id
            WHERE 
                u.id = :id;
            ";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['id' => $id]);
            $payment = $stmt->fetchAll();
            $response = $payment;
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