'use strict';

angular.module('sra.controllers', ['angular-loading-bar', 'ui.grid', 'ui.grid.edit', 'sra.services'])
/*
 * 'DashCtrl' controller
*/
.controller('DashCtrl', function($scope, $routeParams, User, $location, AppAuth, $q, $window, $http) {
  AppAuth.ensureHasCurrentUser(User);
    var UserPromise = $q.when(AppAuth.currentUser.$promise || AppAuth.currentUser);

    UserPromise.then(function(user){
      console.log('user');
      $http.post('http://localhost:8080/SRA/customer/list',
      { sessionId: $window.sessionStorage.sessionId}).then(function(res){
        console.log($window.sessionStorage.sessionId);
        console.log(res);
        $scope.customerList = res.data.data;
        //$('.master-list').DataTable();
      }, function(err){
        console.log('error');
      });
    }, function(){
      console.log('error');
    });
})


/*
 * 'LoginCtrl' controller
*/
.controller('LoginCtrl', function($rootScope, $scope, $routeParams, User, $location, AppAuth, $http, $window) {

  $scope.login = function () {
    $scope.loginError = { "msg": "", "type": "" };
    console.log('login');
    $http.post('http://localhost:8080/SRA/authenticate',{
        "token" : "QCiTzbXCAYA3AvDgYN3MuBwY/1i89q6TfW7aVS1Av1c=",
        "digest" : "6R1HZqYJFfRQUA0L/hqCEA==",
        "user" : {
          "username" : "john.doe",
          "password" : "X03MO1qnZdYdgyfeuILPmQ=="
        }
    }).then(function(res){
      console.log(res);
      var next = $location.nextAfterLogin || '/';
      $location.nextAfterLogin = null;
      $window.sessionStorage.sessionId = res.data.sessionId;
      console.log(res);
      AppAuth.currentUser = res.data.data;

      if (next === "/login") {
          next = "/home";
        }
        $location.path(next);
    },function (res) {
          $scope.loginError.msg = 'error';
          $scope.loginError.type = "alert-danger alert-dismissible";
    });
  };
})

/*
 * 'LogoutCtrl' controller
*/
.controller('LogoutCtrl', function($scope, $routeParams, User, $location, AppAuth, $window) {
  User.logout(function() {
    $scope.currentUser = AppAuth.currentUser = null;
    $window.sessionStorage.sessionId = null;
    $location.path('/login');
  });
})

/*
 * 'DetailsCtrl' controller
*/
.controller('DetailsCtrl', function($scope, $routeParams, User, $location, AppAuth, $window, $q, $http, $rootScope) {
  AppAuth.ensureHasCurrentUser(User);
    var UserPromise = $q.when(AppAuth.currentUser.$promise || AppAuth.currentUser);

    UserPromise.then(function(user){
      console.log('get user deatils', $rootScope.currentCustomerId);
      $http.post('http://localhost:8080/SRA/customer/details',
      { sessionId: $window.sessionStorage.sessionId,
        customerid : $rootScope.currentCustomerId }).then(function(res){
        console.log($window.sessionStorage.sessionId);
        console.log(res);
        $scope.customerInfo = res.data.data;
      }, function(err){
        console.log('error');
      });
    }, function(){
      console.log('error');
    });
})

/*
 * 'range' filter
*/
.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i < total; ++i) {
      input.push(i);
    }
    return input;
  };
});
