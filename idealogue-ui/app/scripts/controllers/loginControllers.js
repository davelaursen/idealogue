'use strict';

angular.module('idealogue.loginControllers', [])

.controller('LoginCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
    $scope.hideHeader();
    $scope.login = { };

    $scope.login = function() {
        Auth.login($scope.login.username, $scope.login.password,
            function(result, message) {
                if(result === true) {
                    $location.path('/ideas');
                }
                else {
                    $scope.login.message = message;
                }
            }
        );
    };

    $scope.register = function() {
        $location.path('/register');
    };
}])

.controller('RegisterCtrl', ['$scope', '$location', 'Util', 'Auth', 'User', function($scope, $location, Util, Auth, User) {
    $scope.hideHeader();
    $scope.user = { };
    $scope.password = { };

    $scope.save = function(form) {
        if (!form.$valid) {
            for (var prop in form) {
                if (form.hasOwnProperty(prop) && prop.indexOf('$', 0) === -1) {
                    form[prop].$touched = true;
                }
            }
            return;
        }

        var rawPass = $scope.password.new;
        var newPass = CryptoJS.MD5(rawPass).toString();

        $scope.user.password = newPass;
        $scope.user.isEnabled = true;

        var timestamp = Util.getISO8601DateString();
        $scope.user.createdDate = timestamp;
        $scope.user.updatedDate = timestamp;

        var saveUser = function(user, password) {
            User.save(user, function(response) {
                Auth.login(user.id, password,
                    function(result, message) {
                        if(result === true) {
                            $location.path('/ideas');
                        }
                        else {
                            alert(message);
                        }
                    }
                );
            });
        };

        User.getOne($scope.user.id,
            function() {
                alert('username is already in use - please enter a different username');
            },
            function() {
                saveUser($scope.user, rawPass);
            }
        );
    };

    $scope.cancel = function() {
        $location.path('/login');
    };
}]);