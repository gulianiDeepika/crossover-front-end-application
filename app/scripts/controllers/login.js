'use strict';

/**
 * @ngdoc function
 * @name crossoverApp.controller:LoginCtrl
 * @description
 * # MainCtrl
 * Controller of the crossoverApp
 */
angular.module('crossoverApp')
  .controller('LoginCtrl', function ($scope, authenticationSvc, $location) {
    $scope.login = function() {
      function getEncodedPass(password) {
        //return btoa(md5.createHash(password || ''));
      };

      var username = $scope.username,
          password = $scope.password,
          encodedPass = password;
      authenticationSvc.login(username, password, encodedPass);
      $location.path('/home');
    };
  });
