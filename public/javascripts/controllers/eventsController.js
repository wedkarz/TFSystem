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
	.controller('navBarCtrl', function ($scope, $rootScope, $http){
            $rootScope.user = {};
	})
    .controller('authenticationCtrl', function ($scope, $rootScope, $http, AuthenticationService) {
            $scope.user = $rootScope.user;

            $scope.submit = function() {
                var promise = AuthenticationService.login($scope.UUID);
                promise.then(function(payload) {
                                           $rootScope.user = payload.data;
                                           $rootScope.user.isAuthenticated = true;
                                       },
                                       function(errorPayload) {
                                           $log.error('failure loading movie', errorPayload);
                                       })
            };
    })
    .factory('AuthenticationService', function($http, $q) {
           var user = {};
          
           var login = function (uuid) {
             var deferred = $q.defer();
          
             $http.post("/authentication/login", {
               token: uuid
             }).then(function(result) {
               user = result;
               user.isAuthenticated = true;
               deferred.resolve(user);
             }, function(error) {
               deferred.reject(error);
             });
          
             return deferred.promise;
           }
          
           return {
             login: login,
             user: user
           };
         });
