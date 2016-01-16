var app = angular.module('app', []);

app.constant('config', {
  'base' : 'http://localhost/ajax_bus/' 
});

app.service('service', function($http, config) {
  
});

app.controller('controller', function($scope, service, config) {
  $scope.base = config.base;

});