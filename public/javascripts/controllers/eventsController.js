angular.module('techFeast')
	.constant('eventListUrl', '/eventList')
	.constant('eventNewUrl', '/event/new')
	.controller('eventListCtrl', function ($scope, $http, $location, eventListUrl, eventNewUrl){

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

		$scope.createEvent = function () {
			$location.path(eventNewUrl);
		}

	});
