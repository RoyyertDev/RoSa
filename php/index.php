<?php

use App\Http\Controllers\Chats;
use App\Http\Controllers\Messages;
use App\Http\Controllers\Users;
use App\Http\Controllers\Foods;
use App\Http\Controllers\Categories;
use App\Http\Controllers\Items;
use App\Http\Controllers\Products;

require_once __DIR__ . '/config/autoload.php';
header('Content-Type: application/json');

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); 
$method = $_SERVER['REQUEST_METHOD'];
$body = file_get_contents('php://input');
$dates = json_decode($body, true);
$id = null; 
if (preg_match('/\/items\/(\w+)/', $uri, $matches)) { 
    $id = $matches[1];
}
if (preg_match('/\/productsItems\/(\w+)/', $uri, $matches)) { 
    $id = $matches[1];
}

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
            // case 'GET':
            //     Chats::show($dates);
            // break;
        }
    break;
    case '/userChats':
        switch ($method) {
            case 'POST':
                Chats::show($dates);
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
    case '/categories':
        switch ($method) {
            case 'GET':
                Categories::show();
            break;
        }
    break;
    case '/foods':
        switch ($method) {
            case 'GET':
                Foods::show();
            break;
            case 'POST':
                Foods::save($dates);
            break;
        }
    break;
    case '/items':
        switch ($method) {
            case 'POST':
                Items::save($dates);
            break;
            case 'GET':
                Items::show();
            break;
        }
    break;
    case '/items/'.$id:
        switch ($method) {
            case 'GET':
                Items::getItemForIdFood($id);
            break; 
        }
    break;
    case '/products':
        switch ($method) {
            case 'GET':
                Products::show();
            break;
            case 'POST':
                Products::save($dates);
            break;
        }
    break;
    case '/productsItems':
        switch ($method) {
            case 'POST':
                Products::saveProductItems($dates);
            break;
        }
    break;
    case '/productsItems/'.$id:
        switch ($method) {
            case 'GET':
                Products::showProductItems($id);
            break; 
        }
    break;
}
?>