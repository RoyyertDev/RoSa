<?php

namespace App\Models;

use Config\BD;
use PDOException;

class UserDetails
{
    public static function show(int $id) {
        $conn = BD::connect();
        $sql = "SELECT * FROM user_details WHERE fk_user = :fk_user";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute(['fk_user' => $id]);
            $userDetails = $stmt->fetch();
            $response = [
                'status' => "success",
                'userDetails' => $userDetails ?? 'Sin detalles de usuario'
            ];
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

    public static function create(Array $dates) {
        $conn = BD::connect();
        $sql = "INSERT INTO user_details (fk_user, fk_role, fk_countries, fk_provinces, fk_cities, zip_code, site_reference, phone) VALUES (:fk_user, :fk_role, :fk_countries, :fk_provinces, :fk_cities, :zip_code, :site_reference, :phone)";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute($dates);
            $response = [
                'status' => "success",
                'message' => "Detalles de usuario creado correctamente",
            ];
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

    public static function update(Array $dates) {
        $conn = BD::connect();
        $sql = "UPDATE user_details SET fk_role = :fk_role, fk_countries = :fk_countries, fk_provinces = :fk_provinces, fk_cities = :fk_cities, zip_code = :zip_code, site_reference = :site_reference, phone = :phone WHERE fk_user = :fk_user";
        try {
            $stmt = $conn->prepare($sql);
            $stmt->execute($dates);
            $response = [
                'status' => "success",
                'message' => "Detalles de usuario creado correctamente",
            ];
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