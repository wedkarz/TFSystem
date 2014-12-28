
angular.module("techFeast", ["ngRoute", "ngCookies", "ngResource", "ngTable"])
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
        all: {name: '[Wszystkie role]', value: '', privilegeLevel: 0},
        participant: {name: 'Uczestnik', value: 'participant', privilegeLevel: 0},
        presenter: {name: 'Prezenter', value: 'presenter', privilegeLevel: 1},
        organizer: {name: 'Organizator', value: 'organizer', privilegeLevel: 2},
        superorganizer: {name: 'Super Organizator', value: 'superorganizer', privilegeLevel: 3}
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    })
    .config(function ($routeProvider, USER_ROLES) {

        $routeProvider.when("/events", {
            templateUrl: "javascripts/views/eventList.html",
            controller: "eventListCtrl",
            data: {
                  authorizedRole: USER_ROLES.all
            }
        });

        $routeProvider.when("/event/edit/:id", {
            templateUrl: "javascripts/views/eventEdit.html",
            controller: "eventEditCtrl",
            data: {
                authorizedRole: USER_ROLES.organizer
            }
        });

        $routeProvider.when("/event/:id", {
            templateUrl: "javascripts/views/eventDetails.html",
            controller: "eventDetailsCtrl",
            data: {
                authorizedRole: USER_ROLES.organizer
            }
        });

        $routeProvider.when("/eventDetails/", {
            templateUrl: "javascripts/views/eventDetails.html",
            controller: "eventDetailsCtrl",
            data: {
                authorizedRole: USER_ROLES.organizer
            }
        });

        $routeProvider.when("/users", {
            templateUrl: "javascripts/views/users.html",
            controller: "usersCtrl",
            data: {
                authorizedRole: USER_ROLES.superorganizer
            }
        });

        $routeProvider.otherwise({
            templateUrl: "javascripts/views/eventList.html",
            controller: "eventListCtrl",
            data: {
                authorizedRole: USER_ROLES.all
            }
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

        $scope.roleForValue = AuthService.roleForValue;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorizedRole = AuthService.isAuthorizedRole;

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
           var authorizedRole = next.data.authorizedRole;
           if(next.$$route && !AuthService.isAuthorizedRole(authorizedRole)) {
                if(AuthService.isAuthenticated()) {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }

                $location.path('/eventList');
           }
        });

        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function() {
            $location.path('/eventList');
        })
    });