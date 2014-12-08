angular.module("events")
    .controller('AuthenticationCtrl', function ($scope, $rootScope, $cookieStore, AuthService, AUTH_EVENTS) {
            $scope.credentials = {
                uuid: ''
              };
            $scope.login = function(credentials) {
                AuthService.login(credentials)
                    .then(function (user) {
                          $scope.setCurrentUser(user);
                          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        }, function () {
                          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                        });
            }

            $scope.logout = function() {
                AuthService.logout()
                    .then(function () {
                                              $scope.setCurrentUser(null);
                                              $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                                            }, function () {
                                              $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
                                            });
            }
    });