describe("Event edit controller test", function () {

	var mockScope = {};
	var controller;
	var backend;
	var location;
	var routeParams = {};
	var url = '/event/1';

	var	data = {"event":{"id":1,"date":1418252400000,"place":"Gdańsk"},
				"presentations":[{"id":1,"name":"Scala","time":"15.00-16.00","presenters":"Presenter 1, Presenter 2","description":"aaa","eventId":1},
								{"id":2,"name":"Play","time":"16.00-16.45","presenters":"Presenter 1","description":"aaa","eventId":1},
								{"id":3,"name":"Slick","time":"17.00-17.30","presenters":"Presenter 2","description":"cccc","eventId":1}]};

	beforeEach(angular.mock.module("techFeast"));

	beforeEach(angular.mock.inject(function ($controller, $rootScope, $http, $location, $routeParams, $httpBackend) {
		mockScope = $rootScope.$new();
		mockScope.data = data;
		routeParams.id = 1;
		backend = $httpBackend;

		controller = $controller("eventEditCtrl", {
			$scope: mockScope,
			$routeParams: routeParams,
			$http: $http,
			$location: $location,
			$eventUrl: url,
			$eventUpdateUrl: url
		});
		
	}));

	it("Makes an Ajax requests", function () {
		backend.expect("GET", url).respond(
			{"event":{"id":1,"date":1418252400000,"place":"Gdańsk"},
			 "presentations":[{"id":1,"name":"Scala","time":"15.00-16.00","presenters":"Presenter 1, Presenter 2","description":"aaa","eventId":1},
							  {"id":2,"name":"Play","time":"16.00-16.45","presenters":"Presenter 1","description":"aaa","eventId":1},
							  {"id":3,"name":"Slick","time":"17.00-17.30","presenters":"Presenter 2","description":"cccc","eventId":1}]}
			);
		backend.flush();
		backend.verifyNoOutstandingExpectation();
		mockScope.updateEvent();
		backend.expectPUT(url, data).respond(201, 'success');
	});

});
