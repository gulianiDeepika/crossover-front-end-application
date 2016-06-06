angular.module('sra.services', ['lbServices'])
  .factory('AppAuth', function($window) {
    return {
      currentUser: null,

      // Note: we can't make the User a dependency of AppAuth
      // because that would create a circular dependency
      //   AppAuth <- $http <- $resource <- LoopBackResource <- User <- AppAuth
      ensureHasCurrentUser: function(User) {
        if (this.currentUser) {
          console.log('current User', this.currentUser);
        } else {
          if ($window.sessionStorage.sessionId !== null) {
            this.currentUser = $window.sessionStorage.sessionId;
            return this.currentUser;
          } else {
            console.log('User.getCurrent() err');
            return null;
          }
        }
      }
    }
  });
