angular.module('techFeast')
	.constant('eventListUrl', '/eventList')
	.controller('eventListCtrl', function ($scope, $http, $location, eventListUrl){

		$scope.data = {};
		$scope.errorInfo = '';

		$http.get(eventListUrl)
			.success(function (data) {
				$scope.data = data;
			})
			.error(function (error) {
				$scope.errorInfo = error;
			});
 
		$scope.editEvent = function (eventId) {
			$location.path('/event/edit/' + eventId);
		};

		$scope.formatDate = function (milliseconds) {
        	return new Date(milliseconds).toLocaleDateString();
        }

		$scope.showDetails = function (eventId) {
			$location.path('/event/' + eventId);
		}

	});
