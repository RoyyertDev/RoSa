<?php
use App\Http\Controllers\Users;

require_once __DIR__ . '/config/autoload.php';
header('Content-Type: application/json');
session_start(); 

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); 
$method = $_SERVER['REQUEST_METHOD'];
$body = file_get_contents('php://input');
$dates = json_decode($body, true);

switch ($uri) {
    case '/users': 
        switch ($method) {
            case 'POST':
                Users::save($dates);
            break;
            case 'GET':
                Users::show();
            break;
        }
    break;
}
?>