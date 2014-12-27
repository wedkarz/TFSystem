angular.module("techFeast")
    .factory('UsersFactory', function ($resource) {
        return $resource('/users', {}, {
            query: { method: 'GET'},
            create: { method: 'POST' }
        })
    })

    .factory('UserFactory', function ($resource) {
        return $resource('/users/:email', {}, {
            show: { method: 'GET' },
            update: { method: 'PUT', params: {email: '@email'} },
            delete: { method: 'DELETE', params: {email: '@email'} }
        })
    });