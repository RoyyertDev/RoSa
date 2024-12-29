<?php 

namespace Config;

use Config\App;
use PDO;
use PDOException;

class BD {
    public static function connect()
    {
        try {
            $conn = new PDO(
                "mysql:host=" . APP::CONEXION['host'] . ";
                dbname=" . APP::CONEXION['database'],
                APP::CONEXION['user'],
                APP::CONEXION['password']
            );
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo "Error de conexion: " . $e->getMessage();
        }
    }
}