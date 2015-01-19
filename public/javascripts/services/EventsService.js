angular.module("techFeast")
    .service('EventsService', function () {

        this.getEventDateById = function (events, id) {
            var event = _.find(events, function (event) {
                return event.event.id === id;
            });
            return event.event.date;
        };
    });