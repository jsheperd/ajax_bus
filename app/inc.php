<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
    
// Check the parameters
//echo print_r($request);
try {
  
  if(!is_int($request)) {
    throw new Exception('It isn\'t a number. PHP');
  }
  echo json_encode(['status' => 'success',
                    'data' => $request + 1,
                    'message' => ''
                   ]);
} catch (Exception $e) {
  echo json_encode(['status' => 'error',
                    'data' => null,
                    'message' => $e->getMessage()
                    ]);
}

?>