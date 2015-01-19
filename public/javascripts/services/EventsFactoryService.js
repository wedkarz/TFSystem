angular.module("techFeast")
    .factory('EventsFactory', function ($resource) {
        return $resource('/eventList', {}, {
                     
        });
    })
    .factory('EventFactory', function ($resource) {
        return $resource('/event/:id', {}, {
            show: { method: 'GET', params : {id: '@id'} },
            update: { method: 'PUT', params: {id: '@id'} },
            delete: { method: 'DELETE', params: {id: '@id'} }
        });
    })
    .factory('NewEventFactory', function ($resource) {
        return $resource('/event/new', {}, {
            create : { method : 'POST' }
        });
    });