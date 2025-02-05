<?php

use App\Http\Controllers\Chats;
use App\Http\Controllers\Messages;
use App\Http\Controllers\Users;
use App\Http\Controllers\UserDetails;
use App\Http\Controllers\Foods;
use App\Http\Controllers\Categories;
use App\Http\Controllers\Items;
use App\Http\Controllers\Products;
use App\Http\Controllers\RolUsers;
use App\Http\Controllers\Countries;
use App\Http\Controllers\Provinces;
use App\Http\Controllers\Cities;
use App\Http\Controllers\Payments;
use App\Http\Controllers\SqlRequest;

require_once __DIR__ . '/config/autoload.php';
header('Content-Type: application/json');

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); 
$method = $_SERVER['REQUEST_METHOD'];
$body = file_get_contents('php://input');
$dates = json_decode($body, true);
$id = null; 
if (preg_match('/\/users\/(\w+)/', $uri, $matches)) { 
    $id = $matches[1];
}
if (preg_match('/\/items\/(\w+)/', $uri, $matches)) { 
    $id = $matches[1];
}
if (preg_match('/\/items\/find\/(\w+)/', $uri, $matches)) { 
    $id = $matches[1];
}
if (preg_match('/\/productsItems\/(\w+)/', $uri, $matches)) { 
    $id = $matches[1];
}
if (preg_match('/\/products\/(\w+)/', $uri, $matches)) { 
    $id = $matches[1];
}
if (preg_match('/\/userDetails\/(\w+)/', $uri, $matches)) { 
    $id = $matches[1];
}
if (preg_match('/\/provinces\/(\w+)/', $uri, $matches)) { 
    $id = $matches[1];
}
if (preg_match('/\/cities\/(\w+)/', $uri, $matches)) { 
    $id = $matches[1];
}
if (preg_match('/\/foods\/(\w+)/', $uri, $matches)) { 
    $id = $matches[1];
}
if (preg_match('/\/chats\/(\w+)/', $uri, $matches)) { 
    $id = $matches[1];
}
if (preg_match('/\/payments\/(\w+)/', $uri, $matches)) { 
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
    case '/users/'.$id: 
        switch ($method) {
            case 'GET':
                Users::find($id);
            break;
            case 'PUT':
                Users::update($dates, $id);
            break;
        }
    break;
    case '/userDetails/'.$id:
        switch ($method) {
            case 'GET':
                UserDetails::show($id);
            break;
        }
    break;
    case '/userDetails':
        switch ($method) {
            case 'POST':
                UserDetails::create($dates);
            break;
            case 'PUT':
                UserDetails::update($dates);
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
    case '/chats/'.$id: 
        switch ($method) {
            case 'GET':
                Chats::findMessages($id);
            break;
            case 'DELETE':
                Chats::delete($id);
            break;
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
    case '/foods/'.$id:
        switch ($method) {
            case 'GET':
                Foods::find($id);
            break;
            case 'PUT':
                Foods::update($dates, $id);
            break;
            case 'DELETE':
                Foods::delete($id);
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
            case 'PUT':
                Items::update($dates, $id);
            break;
            case 'DELETE':
                Items::delete($id);
            break;
        }
    break;
    case '/items/find/'.$id:
        switch ($method) {
            case 'GET':
                Items::find($id);
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
    case '/products/'.$id:
        switch ($method) {
            case 'GET':
                Products::find($id);
            break;
            case 'PUT':
                Products::update($dates, $id);
            break;
            case 'DELETE':
                Products::delete($id);
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
    case '/rol_users':
        switch ($method) {
            case 'GET':
                RolUsers::show();
            break; 
        }
    break;
    case '/countries':
        switch ($method) {
            case 'GET':
                Countries::show();
            break; 
        }
    break;
    case '/provinces/'.$id:
        switch ($method) {
            case 'GET':
                Provinces::show($id);
            break; 
        }
    break;
    case '/cities/'.$id:
        switch ($method) {
            case 'GET':
                Cities::show($id);
            break; 
        }
    break;
    case '/sqlRequest':
        switch ($method) {
            case 'POST':
                SqlRequest::save($dates);
            break; 
            case 'GET':
                SqlRequest::save($dates);
            break; 
        }
    break;
    case '/payments/'.$id:
        switch ($method) {
            case 'GET':
                Payments::show($id);
            break; 
        }
    break;
}
?>