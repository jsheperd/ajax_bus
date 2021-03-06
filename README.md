# ajax_bus
Example project to study message bus from server to angular client.

# The Problem
We have a server with database connection, an API surface for communicate with the server, a service layer on the client side and a controller layer for the frontend. The user make multiple actions those has to go through up and down on the full system and that is a totally async channel.

So, how should I handle the messages ?

What kind of protocoll should simplify my life ?

# The setup
- The server is indifferent.
- The client is angularjs.
- The communication made with JSON.

# The protocoll
The messages has got the same format at every level.

```javascript
var succeeded = { status: 'success',
                  data: { data1: 1, data2: 2, ... },
                  message: null | 'message' };

var error =     { status: 'error',
                  data: null,
                  message: 'detailed error message' };
```
# The answer
Each layer should work as a proxy layer. The result from the sublayer should be proxied or replaced at case of error. The messages about the error should be defined on the enduser perspective.
 
 
 ```javascript
 app.service('service', function($http, $q, config) {
  this.get = function(url) {
    var deferred = $q.defer();
    
    $http.get(config.base + url).then(
      function(resp){
        deferred.resolve(resp.data);
        },
      function(resp){
        deferred.resolve({status: 'error', data: null, message: resp.statusText});
        // In this case we needn't another function for the reject
      }
    );
    
    return deferred.promise;
  };
```

The same on the server side
```php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
    
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
```

 
The controller receives only 'success' or 'error' returns. No need to handle different cases on the controller level. If the return is 'success', then the controller allowed to use it, but if it is 'error', then it has the error message for the user.
The server side PHP also can send error messages to the frontend.
 


 