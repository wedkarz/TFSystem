angular.module('techFeast')
	.constant('usersListUrl', '/users')
	.filter("property", ["$filter", function($filter){
        var parseString = function(input){
            return input.split(".");
        }

        var checkNegation = function(input){
            return input[0] === '!';
        }

        function getValue(element, propertyArray) {
            var value = element;

            angular.forEach(propertyArray, function(property) {
                value = value[property];
            });

            return value;
        }

        return function (array, propertyString, target) {
            var isNegation = checkNegation(target);
            var properties = parseString(propertyString);

            return $filter('filter')(array, function(item){
                var value = getValue(item, properties);
                if(!isNegation) {
                    return value === target;
                } else {
                    return value !== target.substr(1, value.length - 1);
                }
            });
        }
    }])
	.controller('usersCtrl', function ($scope, $http, $location, $filter, ngTableParams, usersListUrl, UsersFactory, UserFactory, AuthService, USER_ROLES) {
	            $scope.users = UsersFactory.query();
	            $scope.isNewRowVisible = false;
                $scope.editedUser = {}
                $scope.roleFilter = "";
                $scope.allUserRoles = AuthService.allUserRoles;
                $scope.roleForValue = AuthService.roleForValue;

                function guid() {
                    function _p8(s) {
                        var p = (Math.random().toString(16)+"000000000").substr(2,8);
                        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
                    }
                    return _p8() + _p8(true) + _p8(true) + _p8();
                }

                $scope.isCurrentlyLoggedInUser = function (user) {
                    return $scope.currentUser.email === user.email;
                }

                $scope.setEdit = function (user) {
                    $scope.isInEditMode = true;
                    $scope.editedUser = angular.copy(user);
                    $scope.isNewRowVisible = false;
                };

                $scope.deleteUser = function (user) {
                    UserFactory.delete({ email: user.email });

                    var elemIndex = $scope.users.users
                                                                .map(function(elem) {
                                                                    return elem.email;
                                                                })
                                                                .indexOf(user.email);

                                        if(elemIndex > -1) {
                                            $scope.users.users.splice(elemIndex, 1);
                                        }
                };

                $scope.addUser = function() {
                    $scope.editedUser = {};
                    $scope.editedUser.token = guid().toUpperCase();
                    $scope.editedUser.role = USER_ROLES.participant.value;
                    $scope.isNewRowVisible = true;
                };

                $scope.createNewUser = function () {
                    var createUser = UsersFactory.create($scope.editedUser);
                    createUser.$promise.then(function (res) {
                        var userAddedResult = res;
                        var user = {email: userAddedResult.email, token: userAddedResult.token, role: userAddedResult.role};
                        $scope.users.users.splice(0, 0, user);
                        $scope.isNewRowVisible = false;
                        $scope.editedUser = {};
                    });
                };

                $scope.generateNewUUID = function () {
                    $scope.editedUser.token = guid().toUpperCase();
                }

                $scope.updateUser = function() {
                    UserFactory.update($scope.editedUser);

                    var elemIndex = $scope.users.users
                                            .map(function(elem) {
                                                return elem.email;
                                            })
                                            .indexOf($scope.editedUser.email);

                    if(elemIndex > -1) {
                        $scope.users.users[elemIndex] = $scope.editedUser;
                    }

                    $scope.editedUser = {};
                }

                $scope.cancelUpdate = function() {
                    $scope.editedUser = {};
                    $scope.isNewRowVisible = false;
                }

                $scope.getTemplate = function (user) {
                        if(user.email === $scope.editedUser.email && !$scope.isNewRowVisible) return 'edit';
                        else return 'display';
                    };

                $scope.usersFilterComparator = function(actual, expected) {
                    return angular.equals(actual, expected) || angular.equals(expected, "");
                }
            });