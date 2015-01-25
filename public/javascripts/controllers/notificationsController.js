angular.module('techFeast')
	.constant('notifiationListUrl', '/notifications')
    .constant('notificationUrl', '/notification')
    .constant('newNotificationUrl', '/notification/new')
	.controller('notificationsCtrl', function ($scope, $http, $location, NotificationsFactory, NotificationFactory, NewNotificationFactory, EventsFactory, EventsService, AuthService, TimeFormatter, toastr, USER_ROLES) {
	            
                $scope.data = NotificationsFactory.query();
                $scope.events = EventsFactory.query();
                $scope.allUserRoles = AuthService.allUserRoles;

                $scope.newNotification = {};
                $scope.isAdding = false;

                $scope.editedNotification = {};
                $scope.isEditing = false;

                $scope.delete = function (id) {
                    NotificationFactory.delete({ id: id }, function (msg) {
                        toastr.success('Usuwanie zakończone pomyślnie.', 'Sukces');
                        $scope.data = NotificationsFactory.query();
                    }, function (error) {
                        toastr.error('Błąd przy usuwaniu.');
                    });
                };

                $scope.add = function() {
                    $scope.isAdding = true;
                };

                $scope.cancelAdd = function () {
                    $scope.isAdding = false;
                    $scope.newNotification = {};
                };

                $scope.save = function () {
                    $scope.newNotification.id = null;
                    $scope.newNotification.sendTime = parseInt($scope.newNotification.sendTime);
                    $scope.newNotification.eventId = parseInt($scope.newNotification.eventId);

                    NewNotificationFactory.create($scope.newNotification, function (msg) {
                        toastr.success('Dodawanie zakończone pomyślnie.', 'Sukces');
                        $scope.data = NotificationsFactory.query();
                        $scope.isAdding = false;
                        $scope.newNotification = {};
                    }, function (error) {
                        toastr.error('Błąd przy dodawaniu.');
                    });
                };

                $scope.edit = function (notification) {
                    $scope.editedNotification = angular.copy(notification);
                    $scope.isEditing = true;
                };

                $scope.cancelEdit = function () {
                    $scope.editedNotification = {};
                    $scope.isEditing = false;
                };

                $scope.update = function() {
                    $scope.editedNotification.sendTime = parseInt($scope.editedNotification.sendTime);
                    $scope.editedNotification.eventId = parseInt($scope.editedNotification.eventId);
                    NotificationFactory.update($scope.editedNotification, function (msg) {
                        toastr.success('Edycja zakończona pomyślnie.', 'Sukces');
                        $scope.data = NotificationsFactory.query();
                        $scope.editedNotification = {};
                        $scope.isEditing = false;
                    }, function (error) {
                        toastr.error('Błąd przy edycji.');
                    });
                };

                $scope.getTemplate = function (notification) {
                    return notification.id === $scope.editedNotification.id ? 'edit' : 'display';
                };

                $scope.getRoleName = function (roleValue) {
                    return AuthService.roleForValue(roleValue).name;
                };

                $scope.formatDate = function (miliseconds) {
                    return TimeFormatter.formatDate(miliseconds);
                };

                $scope.getEventDateById = function (id) {
                    return EventsService.getEventDateById($scope.events, id);                    
                };

            });
