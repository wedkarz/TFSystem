angular.module("events")
	.constant('eventListUrl', '/events')
	.controller('eventListCtrl', function ($scope, $http, eventListUrl){
		
		$scope.data = {};

		$http.get(eventListUrl)
			.success(function (data) {
				$scope.data = data;
			})
			.error(function (error) {
				$scope.data.error = error;
			});
	})