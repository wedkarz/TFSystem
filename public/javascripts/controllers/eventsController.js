angular.module("events")
    .constant('eventsUrl', '/events')
	.controller('eventListCtrl', function ($scope, $http, eventsUrl){
		$scope.data = {};

		$http.get(eventsUrl)
			.success(function (data) {
				$scope.data = data;
			})
			.error(function (error) {
				$scope.data.error = error;
			});
	});
//    .factory('AuthenticationService', function($http, $q, $cookieStore) {
//          var user = $cookieStore.get('user');
//          
//          var login = function (uuid) {
//                return $http.post("/authentication/login", { token: uuid })
//                            .success(function (data) {
//                                user = data;
//                                user.isAuthenticated = true;
//                                $cookieStore.put('user',user);
//          			         })
//                            .error(function (error) {
//
//                            });
//         }
//
//         var logout = function() {
//                return $http.post("/authentication/logout")
//                            .success(function (data) {
//                                         user = {};
//                                         $cookieStore.remove('user');
//                   			         })
//                                     .error(function (error) {
//                                         user = {};
//                                         $cookieStore.remove('user');
//                                     });
//         }
//
//         return {
//            login: login,
//            logout: logout,
//            user: user
//         };
//    });
