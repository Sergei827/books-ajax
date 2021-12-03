<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// підєднання массиву з данними (книжками)
require_once "Data/booksArr.php";

// автозавантаження классів
spl_autoload_register(function($class){
    $path = $class;
    $path = str_replace('\\', '/', $path);

    include_once $path.'.php';
});

// створення классу-менеджеру для массиву з данними
$books = new \Data\Books($booksArr);

// отримання URI запиту
$url =  trim($_SERVER['REQUEST_URI'], '/');
$url = trim(str_replace('books', '', $url), '/');



// примітивна маршрутизація
switch($url)
{
	case('horrors'):
	case('detective'):
	case('fantasy'):
		header("HTTP/1.1 200 OK");
	    header('Content-Type: application/json');
	    $books = $books->giveBooksByGenre($url);
	    $books = json_encode($books);
		
		echo $books;
	    break;
	default:
	    require_once "public/index.html";	
}






