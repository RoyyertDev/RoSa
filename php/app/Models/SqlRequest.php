<?php

namespace App\Models;

use Config\BD;
use PDOException;

class SqlRequest {

    public static function save($dates) {
        $conn = BD::connect();
        try {
            $stmt = $conn->prepare($dates['sql']);
            $stmt->execute();
            $response = "success";
        } catch (PDOException $e) {
            $response = "error";
        }
        $conn = null;
        echo json_encode($response);
    }
}