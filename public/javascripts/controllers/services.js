angular.module("techFeast")
    .service('TimeFormatter', function () {

        this.pickStartHourAndFormat = function(presentations) {
            var startDate = new Date(2014, 1, 1, 23, 59, 59);
            presentations.forEach(function(pres){
                var timeStr = pres.time.split("-"),
                    timeArr = timeStr[0].split("."),
                    hour = timeArr[0],
                    minute = timeArr[1],
                    date = new Date (2014, 1, 1, parseInt(hour), parseInt(minute), 0);
                if(date < startDate) startDate = date;
            });
            var minutes = startDate.getMinutes(),
                minuteStr = minutes.toString(),
                AMPM = "",
                hours = startDate.getHours();

            if (minutes < 10) minuteStr = "0" + minuteStr;
            if (minutes === 0) {minuteStr = "";} else {minuteStr = ":" + minuteStr;}
            if(hours <= 12) {AMPM = "AM";} else {AMPM = "PM"; hours = hours - 12;};

            return hours.toString() + minuteStr + AMPM;
        };

        this.formatDateVerbose = function (milliseconds) {

			var m_names = new Array("January", "February", "March",
        	"April", "May", "June", "July", "August", "September",
       		"October", "November", "December"),
			    date = new Date(milliseconds),
			    d = date.getDate(),
			    m = date.getMonth(),
			    y = date.getFullYear();

			return d + ". " + m_names[m] + " " + y;
		};

		this.formatTimeRange = function(time) {
            var timeArr = time.split("-"),
                timeOne = timeArr[0].split("."),
                timeTwo = timeArr[1].split("."),
                hourOne = timeOne[0],
                hourTwo = timeTwo[0],
                minuteOne = timeOne[1],
                minuteTwo = timeTwo[1],
                AMPMOne = "",
                AMPMTwo = "",
                minuteOneStr = "",
                minuteTwoStr = "";

            if(hourOne <= 12 ) {AMPMOne = "AM";} else {AMPMOne = "PM"; hourOne = hourOne - 12;};
            if(hourTwo <= 12 ) {AMPMTwo = "AM";} else {AMPMTwo = "PM"; hourTwo = hourTwo - 12;};

            if(minuteOne > 0) minuteOneStr = ":" + minuteOne.toString();
            if(minuteTwo > 0) minuteTwoStr = ":" + minuteTwo.toString();

            return hourOne + minuteOneStr + " " + AMPMOne + " - " + hourTwo + minuteTwoStr + " " + AMPMTwo;
		};
    })
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
    });
