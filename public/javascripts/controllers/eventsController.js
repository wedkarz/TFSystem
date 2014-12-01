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
	.controller('navBarCtrl', function ($scope, $http){
    		$scope.data = {};
    	})
    .controller('authenticationCtrl', function ($scope, $http) {
            $scope.UUID = "";
            $scope.confirmedUUID = "";

            $scope.submit = function() {
                if ($scope.UUID) {
                    $scope.confirmedUUID = this.UUID;

                    $http.post('/authentication/login', {token: $scope.confirmedUUID}).
                      success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available

                        $scope.confirmedUUID = data + " saved";
                      }).
                      error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.

                        $scope.confirmedUUID = data + " failure";
                      });
                }
            };
    })
