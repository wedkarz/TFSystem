angular.module('techFeast')
	.constant('eventListUrl', '/eventList')
	.controller('eventListCtrl', function ($scope, $http, $location, eventListUrl, EventStorage){

		$scope.data = {};

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

		$scope.showDetails = function (eventId){
			var theOne = $scope.data.filter(function (element){
				if(element.event.id === eventId) return element;
			})[0];
			EventStorage.setEvent(theOne);
			$location.path('/eventDetails/');
		};

	});
