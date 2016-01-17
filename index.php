<?php

require_once __DIR__ . '/vendor/autoload.php';

$app = new \Slim\Slim(['templates.path' => './app']);

//FrontEnd 
$app->get('/', function () use ($app) {
  $app->render('index.html');
});


//test API points
$app->post('/echo', function () use ($app) {
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  
  echo json_encode(['status' => 'success',
                      'data' => $request->data,
                      'message' => ''
                     ]);
});


$app->post('/echo_inc', function () use ($app) {
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  
  echo json_encode(['status' => 'success',
                      'data' => $request->data+1,
                      'message' => ''
                     ]);
});


$app->post('/echo_no_comment', function () use ($app) {
  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  
  echo json_encode(['status' => 'error',
                      'data' => null,
                      'message' => 'Echo? No comment!'
                     ]);
});

           
           
$app->run();
?>