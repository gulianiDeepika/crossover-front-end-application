'use strict';

/**
 * @ngdoc overview
 * @name crossoverApp
 * @description
 * # crossoverApp
 *
 * Main module of the application.
 */
angular
  .module('crossoverApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        resolve: {
          auth: function($q, authenticationSvc, SRAdetailsSvc) {
            var userInfo = authenticationSvc.getUserInfo();
            console.log(userInfo);
            if (userInfo) {
              //return SRAdetailsSvc.getMasterDetails();
              //return $q.when(userInfo);
            } else {
              return $q.reject({ authenticated: false });
            }
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .run( function($rootScope, $location){
  $rootScope.$on("$routeChangeSuccess", function(userInfo) {
    console.log(userInfo);
  });

  $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
    if (eventObj.authenticated === false) {
      $location.path("/");
    }
  });

  });
