# ajax_bus
Example project to study message bus from server to angular client.

# The Problem
We have a server with database connection, an API surface for communicate with the server, a service layer on the client side and a controller layer for the frontend. The user make multiple actions those has to go through up and down on the full system and that is a totally async channel.
So, how should I handle the messages ?
What kind of protocoll should simplify my life ?

# The setup
The server is a Slim2 PHP server with PDO.
The client is angularjs.
The communication made with JSON.

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

 


