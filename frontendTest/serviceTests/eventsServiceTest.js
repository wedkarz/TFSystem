describe("events service test", function () {

	var events = [{"event":{"id":1,"date":1418252399999,"place":"Gdańsk"},
				"presentations":[{"id":1,"name":"Scala","time":"15.00-16.00","presenters":"Presenter 1, Presenter 2","description":"aaa","eventId":1},
								{"id":2,"name":"Play","time":"16.00-16.45","presenters":"Presenter 1","description":"aaa","eventId":1},
								{"id":3,"name":"Slick","time":"17.00-17.30","presenters":"Presenter 2","description":"cccc","eventId":1}]},
			{"event":{"id":2,"date":1422658800000,"place":"Gdańsk"},
				"presentations":[{"id":4,"name":"test","time":"17.00-17.45","presenters":"Presenter 1, Presenter 2","description":"xcz","eventId":2},
								{"id":5,"name":"zzzzzzzzz","time":"18.00-18.45","presenters":"Presenter 1, Presenter 3","description":"aaa","eventId":2}]},
			{"event":{"id":3,"date":1422831600000,"place":"Gdańsk"},
			"presentations":[]}
			];

	beforeEach(angular.mock.module("techFeast"));

	it("checks getEventDateById function", function () {
		angular.mock.inject(function (EventsService) {
			expect(EventsService.getEventDateById(events, 3)).toEqual(1422831600000);
		});
	});
});