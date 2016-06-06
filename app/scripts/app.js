angular.module('crossoverApp', [
  'ngRoute',
  'lbServices',
  'sra.services',
  'sra.controllers'
])
.run(['$rootScope', '$location', function($rootScope, $location){
    $rootScope.options = [
      {text: 'MENU_HOME', url:"home", class:"home", iconClass:"glyphicon glyphicon-user", action: function() {
        $location.path('/home');
      }},
      {text: 'LOGIN', url:"home", class:"login", iconClass:"glyphicon glyphicon-user", action: function() {
        $location.path('/login');
      }}
  ];

  $rootScope.$on('$routeChangeSuccess', function (e, data) {
    $rootScope.bodyclass = data.bodyclass;
  });

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    console.log('$location.path()', $location.path());
  });

}])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.config(function ($compileProvider) {
  // Needed for routing to work
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function ($routeProvider, $locationProvider, $httpProvider) {

  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    bodyclass: 'login-view'
  });

  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'DashCtrl',
    bodyclass: 'home-view'
  });

  $routeProvider.when('/customer/details/:id',{
    templateUrl: 'views/details.html',
    controller: 'DetailsCtrl',
    bodyclass: 'detail-view',
    resolve : {
      customerId: function ($route, $rootScope) {
        $rootScope.currentCustomerId =  $route.current.params.id;
     }
   }
  });

  $routeProvider.when('/logout', {
    templateUrl: 'views/login.html',
    controller: 'LogoutCtrl',
    bodyclass: 'login-view'
  });

  // if none of the above routes are met, use this fallback
  // which executes the 'AppCtrl' controller (controllers.js)
  $routeProvider.otherwise({
    redirectTo: '/home'
  });

  // Intercept 401 responses and redirect to login screen
  $httpProvider.interceptors.push(function ($q, $location) {
    return {
      responseError: function (rejection) {
        console.log('intercepted rejection of ', rejection.config.url, rejection.status);
        if (rejection.status == 401) {
          // save the current location so that login can redirect back
          $location.nextAfterLogin = $location.path();
          $location.path('/login');
        }
        if (rejection.status == 500 && $location.path() === "/logout") {
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
  });
});
