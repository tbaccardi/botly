(function() {
    'use strict'
    angular.module('botly', ['ngMaterial', 'ui.router', 'LocalStorageModule'])


    .run(function($rootScope, authFactory, $state) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            
            if(toState.authRequired === true) { 
                var creds = authFactory.verify('AuthorizationData');
                if(!creds.token) {
                    event.preventDefault();
                    $state.go('login');
                }
                       
                else {
                    console.log(creds.token);
                }
            }
        })
    })

    .config( function($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'htmls/home.html',
                authRequired: true
            })

            .state('login', {
                url: '/login',
                templateUrl: 'htmls/login.html',
                controller: 'loginController as loginCtrl'
            });

        $urlRouterProvider.otherwise('/home');

    })

    // Move to loginController.js

    // .factory('authFactory', 
    //     function(localStorageService) {

    //         var authFactory = {};

    //         authFactory.authData = {
    //             username: '',
    //             token: ''
    //         }

    //         authFactory.verifyUser = function() {
    //             var creds = localStorageService.get('AuthorizationData');
    //             return creds;
    //         }

    //         return authFactory;

    //     })

    // .controller('loginController',
    // function($scope, $state, $q, $http, localStorageService, authFactory) {

    //     this.loginModel = {
    //         username: '',
    //         password: ''
    //     }

    //     var authData = {
    //         username: '',
    //         token: ''
    //     }
        

    //     this.authenticate = function(loginData) {
    //         var deferred = $q.defer();
    //         $http.post('http://localhost:3000/login', loginData).success(function(response) {
    //             authData.username = response.username;
    //             authData.token = response.token;
    //             localStorageService.set('AuthorizationData', authData);
    //             var creds = authFactory.verifyUser();
    //             console.log(creds.token);
    //             deferred.resolve();
    //         }).error(function(error) {
    //             authData.username = '';
    //             authData.token = '';
    //             deferred.reject(error);
    //         });
    //         return deferred.promise;
    //     };

    //     this.login = function(loginData) {
    //         return this.authenticate(loginData).then(function() {
                
    //             $state.go('home');
    //         }, function(error) {
    //             authData.username = '';
    //             authData.token = '';
    //             alert('Authentication failed');
    //         })
    //     }
        
    //     //   this.verifyUser = function() {
    //     //       var creds = localStorageService.get('AuthorizationData');
    //     //       return creds;
    //     //   }
        
    // })
    // End move to loginController.js




})();
