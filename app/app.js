var app = angular.module('app', []);

app.constant('config', {
  'base' : '/ajax_bus/app/',
  'foo_base' : 'http://no_server/ajax_bus/app/'
});

app.service('service', function($http, $q, config) {
  this.get = function(url) {
    var deferred = $q.defer();
    
    $http.get(config.base + url).then(
      function(resp){
        deferred.resolve(resp.data);
        },
      function(resp){
        deferred.reject({status: 'error', data: null, message: resp.statusText});
      }
    );
    
    return deferred.promise;
  };

  
  this.foo_get = function(url) {
    var deferred = $q.defer();
    
    $http.get(config.foo_base + url).then(
      function(resp){
        deferred.resolve(resp.data);
        },
      function(resp){
        deferred.reject({status: 'error', data: null, message: resp.statusText});
      }
    );
    
    return deferred.promise;
  };
  
  
  this.post = function(url, data) {
    var deferred = $q.defer();
    
    $http.post(config.base + url, data).then(
      function(resp){
        deferred.resolve(resp.data);
        },
      function(resp){
        deferred.reject({status: 'error', data: null, message: resp.statusText});
      }
    );
    
    return deferred.promise;
  };

});

app.controller('controller', function($scope, service, config) {
  $scope.base = config.base;
  
  $scope.echo = function (){
  //  service.
    service.get('response.json').then(
      function(resp) { $scope.response = resp;},
      function(resp) { $scope.response = resp;}
    );
  };
  
  
    $scope.echo_null = function (){
  //  service.
    service.get('not_existing_url').then(
      function(resp) { $scope.response = resp;},
      function(resp) { $scope.response = resp;}
    );
  };

  $scope.echo_no_server = function (){
  //  service.
    service.foo_get('anything_else').then(
      function(resp) { $scope.response = resp;},
      function(resp) { $scope.response = resp;}
    );
  };
  
  $scope.inc = function (val){
  //  service.
    service.post('inc.php', val).then(
      function(resp) { $scope.response = resp;},
      function(resp) { $scope.response = resp;}
    );
  };
  
  
});