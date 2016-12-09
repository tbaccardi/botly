(function() {
    'use strict'
    angular.module('botly', ['ngMaterial', 'ui.router'])
    
    
    .run(function($rootScope) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        })
    })
    
    .config( function($stateProvider, $urlRouterProvider) {
        
        $stateProvider
        
            .state('home', {
                url: '/home',
                templateUrl: 'htmls/home.html'

            })
            
            .state('login', {
                url: '/login',
                templateUrl: 'htmls/login.html',
                controller: 'loginController as loginCtrl'
            });
            
        $urlRouterProvider.otherwise('/home');
        
    })
    
    // Move to loginController.js
    
    
    .controller('loginController', ['$scope', '$state', '$q', '$http',
    function($scope, $state, $q, $http) {
    
        this.loginObject = {
            username: '',
            password: ''
        }
        
        var authData = {
            username: '',
            token: ''
        }
        
        this.login = function(loginData) {
            var deferred = $q.defer();
            $http.post('http://localhost:3000/login', loginData).success(function(response) {
                authData.username = response.username;
                authData.token = response.token;
                console.log(response.username);
                deferred.resolve();
            }).error(function(error) {
                authData.username = '';
                authData.token = '';
                deferred.reject(error);
            });
            return deferred.promise;
        };
        
        this.authenticate = function(loginData) {
            return this.login(loginData).then(function() {
                
                $state.go('home');
            }, function(error) {
                authData.username = '';
                authData.token = '';
                alert('Authentication failed');
            })            
        }
        
    }])
    // End move to loginController.js
    
    
    
    
})();