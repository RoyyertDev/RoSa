<?php
use App\Http\Controllers\Users;

require_once __DIR__ . '/config/autoload.php';
session_start(); 

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); 
$method = $_SERVER['REQUEST_METHOD'];

switch ($uri) {
    case 'users': 
        switch ($method) {
            case 'POST':
                Users::save(); 
            break;
        }
    break;
}