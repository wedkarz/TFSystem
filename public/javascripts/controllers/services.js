angular.module("techFeast")
    .service('Session', function () {
          this.create = function (sessionId, userEmail, userUUID, userRole) {
            this.id = sessionId;
            this.userEmail = userEmail;
            this.userUUID = userUUID;
            this.userRole = userRole;
          };
          this.destroy = function () {
            this.id = null;
            this.userEmail = null;
            this.userUUID = null;
            this.userRole = null;
          };
          return this;
        })
    .factory('AuthService', function ($http, Session, URLS) {
      var authService = {};

      authService.login = function (credentials) {
        return $http
          .post(URLS.login, credentials)
          .then(function (res) {
            Session.create("sessionId", res.data.email, res.data.token, res.data.role);
            return res.data;
          });
      };

      authService.logout = function (credentials) {
              return $http
                .post(URLS.logout)
                .then(function (res) {
                  Session.destroy();
                  return res;
                });
            };

      authService.restoreSession = function () {
                                            return $http
                                              .post(URLS.restoreSession)
                                              .then(function (res) {
                                                Session.create("sessionId", res.data.email, res.data.token, res.data.role);
                                                return res.data;
                                              });
      }

      authService.isAuthenticated = function () {
        return !!Session.userEmail;
      };

      authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
          authorizedRoles.indexOf(Session.userRole) !== -1);
      };

      return authService;
    })

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