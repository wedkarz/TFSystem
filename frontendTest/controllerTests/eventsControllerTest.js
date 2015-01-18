describe("Events controller test", function () {

	var mockScope = {};
	var controller;
	var backend;
	var location;

	beforeEach(angular.mock.module("techFeast"));

	beforeEach(angular.mock.inject(function ($httpBackend) {
		backend = $httpBackend;
		backend.expect("GET", "/eventList").respond(
			[{"event":{"id":1,"date":1418252400000,"place":"Gdańsk"},
				"presentations":[{"id":1,"name":"Scala","time":"15.00-16.00","presenters":"Presenter 1, Presenter 2","description":"aaa","eventId":1},
								{"id":2,"name":"Play","time":"16.00-16.45","presenters":"Presenter 1","description":"aaa","eventId":1},
								{"id":3,"name":"Slick","time":"17.00-17.30","presenters":"Presenter 2","description":"cccc","eventId":1}]},
			{"event":{"id":2,"date":1422658800000,"place":"Gdańsk"},
				"presentations":[{"id":4,"name":"test","time":"17.00-17.45","presenters":"Presenter 1, Presenter 2","description":"xcz","eventId":2},
								{"id":5,"name":"zzzzzzzzz","time":"18.00-18.45","presenters":"Presenter 1, Presenter 3","description":"aaa","eventId":2}]},
			{"event":{"id":3,"date":1422831600000,"place":"Gdańsk"},
			"presentations":[]}
			]);

	}));

	beforeEach(angular.mock.inject(function ($controller, $rootScope, $http, $location) {
		mockScope = $rootScope.$new();
		
		controller = $controller("eventListCtrl", {
			$scope: mockScope,
			$http: $http,
			$location: $location,
			eventListUrl: '/eventList'
		});
		backend.flush();
	}));

	it("Makes an Ajax request", function () {
		backend.verifyNoOutstandingExpectation();
	});

	it("Checkes the data", function () {
		expect(mockScope.data).toBeDefined();
		expect(mockScope.data.length).toEqual(3);
		expect(mockScope.data[0].event.place).toEqual("Gdańsk");
		expect(mockScope.data[0].presentations[0].name).toEqual("Scala");
		expect(mockScope.data[2].presentations.length).toEqual(0);
	});


});
