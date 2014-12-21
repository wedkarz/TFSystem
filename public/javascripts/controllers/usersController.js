angular.module('techFeast')
	.constant('usersListUrl', '/users')
	.controller('usersCtrl', function ($scope, $http, $location, $filter, ngTableParams, usersListUrl, UsersFactory, UserFactory) {
	            $scope.users = UsersFactory.query();
	            $scope.isNewRowVisible = false;
                $scope.editedUser = {}

                function guid() {
                    function _p8(s) {
                        var p = (Math.random().toString(16)+"000000000").substr(2,8);
                        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
                    }
                    return _p8() + _p8(true) + _p8(true) + _p8();
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
                    $scope.editedUser.token = guid().toUpperCase();
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
                        if(user.email === $scope.editedUser.email) return 'edit';
                        else return 'display';
                    };
            });