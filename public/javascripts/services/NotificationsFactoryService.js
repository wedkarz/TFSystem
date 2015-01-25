angular.module("techFeast")
    .factory('NotificationsFactory', function ($resource) {
        return $resource('/notifications', {}, {
                        
        });
    })
    .factory('NotificationFactory', function ($resource) {
        return $resource('/notification/:id', {}, {
            show: { method: 'GET', params : {id: '@id'} },
            update: { method: 'PUT', params: {id: '@id'} },
            delete: { method: 'DELETE', params: {id: '@id'} }
        });
    })
    .factory('NewNotificationFactory', function ($resource) {
        return $resource('/notification/new', {}, {
            create : { method : 'POST' }
        });
    });