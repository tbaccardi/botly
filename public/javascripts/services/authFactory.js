/*(function() {
  'use strict'
  angular.module('botly').factory('authFactory', ['$scope', '$state', '$q', '$http',
  function($scope, $state, $q, $http) {

    var authFactory = {};

    authFactory.authData = {
        username: '',
        token: ''
    }

    authFactory.authenticate = function(loginData) {
        var deferred = $q.defer();
        $http.post('http://localhost:3000/login', loginData).success(function(response) {
            authFactory.authData.username = response.username;
            authFactory.authData.token = response.token;
            console.log(response.username);
            deferred.resolve();
        }).error(function(error) {
            authFactory.authData.username = '';
            authFactory.authData.token = '';
            deferred.reject(error);
        });
        return deferred.promise;
    };

    return authFactory;

  }])


})();*/
