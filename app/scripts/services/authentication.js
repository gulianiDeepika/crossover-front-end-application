'use strict';

/**
 * @ngdoc function
 * @name crossoverApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crossoverApp
 */
angular.module('crossoverApp')
.service("authenticationSvc", function($http, $q, $window) {
    var userInfo;

    function getToken() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 32; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }

    function getPasswordHash(password) {
      var hash = 0, i, chr, len;
      if (password.length === 0) return hash;
        for (i = 0, len = password.length; i < len; i++) {
          chr   = password.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
      }
      return hash;
    }

    function login(username, password, encodedPass) {
      var deferred = $q.defer();
      var token = "QCiTzbXCAYA3AvDgYN3MuBwY/1i89q6TfW7aVS1Av1c=";

      var hash = CryptoJS.MD5(password); // password is `password`
// "hash" contains a typed array, needs to be base64
     hash = hash.toString(CryptoJS.enc.Base64); // X01jw2Jap2XWHYMn3riCz5k=

     var digest = username + ","+hash+",QCiTzbXCAYA3AvDgYN3MuBwY/1i89q6TfW7aVS1Av1c=";
     digest = CryptoJS.MD5(digest);
     digest = digest.toString(CryptoJS.enc.Base64); // jH+dH56sKswaDDfeCzDY0A==

      var loginObject = {
        "token": "QCiTzbXCAYA3AvDgYN3MuBWY/1i89q6TfW7aVS1Av1c=",
        "digest": digest,
        "user" : {
          username :username,
          password :hash
        }
      };

      loginObject = { "token" : "QCiTzbXCAYA3AvDgYN3MuBwY/1i89q6TfW7aVS1Av1c=", "digest" : "6R1HZqYJFfRQUA0L/hqCEA==", "user" : { "username" : "john.doe", "password" : "X03MO1qnZdYdgyfeuILPmQ==" } };

      var data = $.param(loginObject);
      console.log(loginObject);

      $http.post("http://localhost:8080/SRA/authenticate", loginObject).then(function(result) {
        console.log(result.data);
        //if (result.data.code == 0) {
          //e6309551-dd33-4b35-8ea4-7337c60b4e18
        //}
        userInfo = result.data.sessionId;
        $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
        deferred.resolve(userInfo);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
  }

  function logout() {
      var deferred = $q.defer();

      $http({
        method: "POST",
        url: 'http://localhost:8080/SRA/logout',
        headers: {
          "access_token": userInfo
        }
      }).then(function(result) {
        $window.sessionStorage["userInfo"] = null;
        userInfo = null;
        deferred.resolve(result);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

  function getUserInfo() {
    return userInfo;
  }

  return {
    login: login,
    logout: logout,
    getUserInfo: getUserInfo
  };
});
