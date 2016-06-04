'use strict';

/**
 * @ngdoc function
 * @name crossoverApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crossoverApp
 */
angular.module('crossoverApp')
  .service('SRAdetailsSvc', function ($scope, $http, authenticationSvc) {
     function getMasterDetails() {
       $http.get('http://localhost:8080/SRA/customer/list', { sessionId:authenticationSvc.getUserInfo() })
       .then(function(result) {
         console.log(result.data);
         $scope.customerList = result.data;
         deferred.resolve(customerList);
       }, function(error) {
         deferred.reject(error);
       });
       return deferred.promise;
     }
      return {
        getMasterDetails : getMasterDetails
      }
  });
