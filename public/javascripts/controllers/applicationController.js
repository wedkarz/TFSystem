angular.module("events")
    .constant('URLS', {
      login: '/authentication/login',
      logout: '/authentication/logout',
      restoreSession: '/authentication/restoreSession'
    })
    .constant('AUTH_EVENTS', {
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      logoutFailed: 'auth-logout-failed',
      sessionTimeout: 'auth-session-timeout',
      notAuthenticated: 'auth-not-authenticated',
      notAuthorized: 'auth-not-authorized'
    })
    .constant('USER_ROLES', {
      all: '*',
      user: 'user',
      presenter: 'presenter',
      superuser: 'superuser'
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
          return $injector.get('AuthInterceptor');
        }
      ]);
    })
    .factory('AuthInterceptor', function ($rootScope, $q,
                                          AUTH_EVENTS) {
      return {
        responseError: function (response) {
          $rootScope.$broadcast({
            401: AUTH_EVENTS.notAuthenticated,
            403: AUTH_EVENTS.notAuthorized,
            419: AUTH_EVENTS.sessionTimeout,
            440: AUTH_EVENTS.sessionTimeout
          }[response.status], response);
          return $q.reject(response);
        }
      };
    })
    .controller('ApplicationCtrl', function ($scope, $rootScope, $cookieStore, AuthService, AUTH_EVENTS, USER_ROLES){
     		$scope.currentUser = null;

     		$scope.userRoles = USER_ROLES;
     		$scope.isAuthorized = AuthService.isAuthorized;

            $scope.setCurrentUser = function (user) {
                $scope.currentUser = user;
            };

            AuthService.restoreSession()
                                .then(function (user) {
                                      $scope.setCurrentUser(user);
                                      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                                    }, function () {
                                      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                                    });
//            var storedUser = $cookieStore.get('user');
//            if(storedUser) {
//                var user = JSON.parse(storedUser);
//                AuthService.recreateSession(user);
//                $scope.setCurrentUser(user);
//                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
//            }
     	});