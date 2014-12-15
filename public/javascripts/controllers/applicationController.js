
angular.module("techFeast", ["ngRoute", "ngCookies"])
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
            function($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    })
    .config(function ($routeProvider) {
        
        $routeProvider.when("/events", {
            templateUrl: "javascripts/views/eventList.html",
            controller: "eventListCtrl"
        });

        $routeProvider.when("/event/edit/:id", {
            templateUrl: "javascripts/views/eventEdit.html",
            controller: "eventEditCtrl"
        });

        $routeProvider.otherwise({
            templateUrl: "javascripts/views/eventList.html",
            controller: "eventListCtrl"
        }); 
    })
    .factory('AuthInterceptor', function($rootScope, $q,
        AUTH_EVENTS) {
        return {
            responseError: function(response) {
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
    .controller('ApplicationCtrl', function($scope, $rootScope, $cookieStore, $location, AuthService, AUTH_EVENTS, USER_ROLES) {
        $scope.currentUser = null;

        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.setCurrentUser = function(user) {
            $scope.currentUser = user;
        };

        AuthService.restoreSession()
            .then(function(user) {
                $scope.setCurrentUser(user);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }, function() {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });

        $rootScope.$on('$routeChangeStart', function (event, next) {
            
            //restrict views which begin with '/event/' for not superusers; redirect them to events list
            if (next.$$route && next.$$route.originalPath.match('^\/event\/') 
                    && (!AuthService.isAuthenticated() || !AuthService.isAuthorized('superuser'))) {
                $location.path('/eventList');
            }
        });
    });