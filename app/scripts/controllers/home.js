'use strict';

/**
 * @ngdoc function
 * @name crossoverApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crossoverApp
 */
angular.module('crossoverApp')
  .controller('HomeCtrl', function ($scope, $http, authenticationSvc, $window) {
    function getMasterDetails() {
      $http.post('http://localhost:8080/SRA/customer/list', { sessionId :$window.sessionStorage.userInfo })
      .then(function(result) {
        $scope.customerList = result.data;
        // deferred.resolve(customerList);
      }, function(error) {
        // deferred.reject(error);
        console.log(authenticationSvc.getUserInfo());
      });
      // return deferred.promise;
    }
    $scope.customerList = getMasterDetails();
  });
