<?php
spl_autoload_register(function ($class) {
    $baseDirs = [
        'Config' => __DIR__ . '',
        'App\Models' => __DIR__ . '/../app/Models/',
        'App\Http\Controllers' => __DIR__ . '/../app/Http/Controllers',
        'App\Http\Middleware' => __DIR__ . '/../app/Http/Middleware',
    ];

    foreach ($baseDirs as $namespace => $baseDir) {
        if (strpos($class, $namespace) === 0) {
            $relativeClass = str_replace($namespace, '', $class);
            $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';
            if (file_exists($file)) {
                require_once $file;
                return;
            }
        }
    }
});