<?php

use App\Http\Controllers\Chats;
use App\Http\Controllers\Messages;
use App\Http\Controllers\Users;

require_once __DIR__ . '/config/autoload.php';
header('Content-Type: application/json');

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); 
$method = $_SERVER['REQUEST_METHOD'];
$body = file_get_contents('php://input');
$dates = json_decode($body, true);



switch ($uri) {
    case '/login':
        switch ($method) {
            case 'POST':
                Users::login($dates);
            break;
        }
    break;
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
    case '/chats': 
        switch ($method) {
            case 'POST':
                Chats::save($dates);
            break;
        }
    break;
    case '/messages':
        switch ($method) {
            case 'POST':
                Messages::save($dates);
            break;
        }
    break;
}
?>