<?php

require_once __DIR__ . '/vendor/autoload.php';

$app = new \Slim\Slim(['templates.path' => './app']);

//FrontEnd 
$app->get('/', function () use ($app) {
  $app->render('index.html');
});



$app->run();
?>