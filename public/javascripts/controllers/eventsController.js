angular.module("events")
	.constant('eventListUrl', '/events')
	.controller('eventListCtrl', function ($scope, $rootScope, $http, eventListUrl){
		
		$scope.data = {};

		$http.get(eventListUrl)
			.success(function (data) {
				$scope.data = data;
			})
			.error(function (error) {
				$scope.data.error = error;
			});
	})
	.controller('navBarCtrl', function ($rootScope, AuthenticationService){
            $rootScope.user = AuthenticationService.user;
	})
    .controller('authenticationCtrl', function ($scope, $rootScope, $http, AuthenticationService) {
            $scope.login = function() {
                AuthenticationService.login($scope.UUID)
                    .success(function (data) {
                        $rootScope.user = data;
                        $rootScope.isAuthenticated = true;
                    })
                    .error(function (error) {
                    });
            }

            $scope.logout = function() {
                AuthenticationService.logout()
                    .success(function (data) {
                        $rootScope.user = {};
                                        })
                                        .error(function (error) {
                                        $rootScope.user = {};
                                        });
            }
    })
    .factory('AuthenticationService', function($http, $q, $cookieStore) {
          var user = $cookieStore.get('user');
          
          var login = function (uuid) {
                return $http.post("/authentication/login", { token: uuid })
                            .success(function (data) {
                                user = data;
                                user.isAuthenticated = true;
                                $cookieStore.put('user',user);
          			         })
                            .error(function (error) {

                            });
         }

         var logout = function() {
                return $http.post("/authentication/logout")
                            .success(function (data) {
                                         user = {};
                                         $cookieStore.remove('user');
                   			         })
                                     .error(function (error) {
                                         user = {};
                                         $cookieStore.remove('user');
                                     });
         }

         return {
            login: login,
            logout: logout,
            user: user
         };
    });
