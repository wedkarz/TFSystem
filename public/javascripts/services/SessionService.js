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
        });