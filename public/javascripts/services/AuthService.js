angular.module("techFeast")
    .factory('AuthService', function ($http, Session, URLS, USER_ROLES) {
      var authService = {};
      authService.allUserRoles = [USER_ROLES.all, USER_ROLES.participant, USER_ROLES.presenter, USER_ROLES.organizer, USER_ROLES.superorganizer];

      authService.roleForValue = function(roleValue) {
         var matchingRoleIndex = authService.allUserRoles.map(function (elem) {
            return elem.value;
         }).indexOf(roleValue);

         return authService.allUserRoles[matchingRoleIndex];
      };

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

      authService.isAuthorizedRoleName = function (minimalAuthorizedRoleName) {
          var role = authService.roleForValue(minimalAuthorizedRole);
          if(role === undefined) {
            return false;
          } else {
            return isAuthorized(role);
          }
      }

      authService.isAuthorizedRole = function (minimalAuthorizedRole) {
          if(minimalAuthorizedRole === undefined)
            return false;

          var currentUserRole = authService.roleForValue(Session.userRole);
          return authService.isAuthenticated() &&
                    currentUserRole.privilegeLevel >= minimalAuthorizedRole.privilegeLevel;
      };


      return authService;
    });