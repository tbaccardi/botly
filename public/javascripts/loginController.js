(function() {
  'use strict'
  angular.module('botly')

  .controller('loginController', ['$scope', '$state', '$q', '$http',
  function($scope, $state, $q, $http) {

      this.loginModel = {
          username: '',
          password: ''
      }

      var authData = {
          username: '',
          token: ''
      }

      this.authenticate = function(loginData) {
          var deferred = $q.defer();
          $http.post('http://192.168.0.3:3000/login', loginData).success(function(response) {
              authData.username = response.username;
              authData.token = response.token;
              console.log(authData.token);
              deferred.resolve();
          }).error(function(error) {
              authData.username = '';
              authData.token = '';
              deferred.reject(error);
          });
          return deferred.promise;
      };

      this.login = function(loginData) {
          return this.authenticate(loginData).then(function() {

              $state.go('home');
          }, function(error) {
              authData.username = '';
              authData.token = '';
              alert('Authentication failed');
          })
      }

  }])


})();
