angular.module('techFeast')
	.constant('eventUrl', '/event/')
	.constant('eventUpdateUrl', '/event/')
	.controller('eventEditCtrl', function ($scope, $routeParams, $http, $location, eventUrl, eventUpdateUrl){
		
		var id = $routeParams.id;

		$scope.data = {};
		$scope.errorInfo = '';		

		$http.get(eventUrl + $routeParams.id)
			.success(function (data) {
				$scope.data = data;
				$scope.data.event.date = formatDate($scope.data.event.date);
			})
			.error(function (error) {
				$scope.errorInfo = error;
			});

		$scope.updateEvent = function () {
			
			$scope.data.event.date.setDate($scope.data.event.date.getDate() + 1);

			$http.put(eventUpdateUrl + $routeParams.id, $scope.data)
				.success(function () {
					$location.path('/event/' + $routeParams.id);		
				})
				.error(function (error) {
					$scope.errorInfo = error;
				});			
		};

		$scope.cancel = function () {
			$location.path('/events');
		};

		$scope.addPresentation = function() {
            $scope.data.presentations.push(createEmptyPresentation());
        };

        $scope.removePresentation = function (index) {
        	$scope.data.presentations.splice(index, 1);
        }

        var createEmptyPresentation = function () {
        	return {id: null, name: null, time: null, presenters: null, eventId: parseInt($routeParams.id)};
        };

        var formatDate = function (milliseconds)	{
			return new Date(milliseconds);
		}
	});