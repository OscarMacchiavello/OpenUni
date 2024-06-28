<?php 

include __DIR__.'/../includes/app.php';

use Controllers\PaginasController;
use MVC\Router;


$router = new Router();

$router->get( '/', [PaginasController::class, 'index']);


$router->comprobarRutas();

