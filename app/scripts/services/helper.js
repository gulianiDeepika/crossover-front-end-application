'use strict';

/**
 * @ngdoc function
 * @name crossoverApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crossoverApp
 */
angular.module('crossoverApp')
  .service('helper', function ($scope) {
      function _get32BitRandomToken() {
        return "";
      }

      function _getBase64(str) {
        return "";
      }

      function _getMd5(str) {
        return "";
      }

      function getToken() {
      }

      function getEncodedPass(password) {

      }

      function getDigest(token) {

      }

      return {
        getToken : getToken,
        getEncodedPass : getEncodedPass,
        getDigest : getDigest
      }
  });
