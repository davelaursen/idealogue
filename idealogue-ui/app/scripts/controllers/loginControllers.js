'use strict';

angular.module('idealogue.loginControllers', [
    'idealogue.utilityServices',
    'idealogue.authServices'
])

.controller('LoginCtrl', function($scope, $location, AuthSvc, UtilSvc) {
    $scope.login = { };

    UtilSvc.hideHeader();

    $scope.login = function() {
        AuthSvc.login($scope.login.username, $scope.login.password,
            function(result, message) {
                if(result === true) {
                    $location.path('/ideas');
                    UtilSvc.showHeader();
                }
                else {
                    $scope.login.message = message;
                }
            }
        );
    };

    $scope.register = function() {
        $location.path('/register');
    }
})

.controller('RegisterCtrl', function($scope, $q, $location, UtilSvc, AuthSvc, UserSvc, User) {
    $scope.user = { };
    $scope.password = { };

    UtilSvc.hideHeader();
    // UserSvc.initializeUserForm();

    $scope.save = function() {
        // validate data
        if (!UserSvc.validateUserForm($scope)) {
            return;
        }

        var rawPass = $scope.password.new;
        var newPass = CryptoJS.MD5(rawPass).toString();
        // var confirm = CryptoJS.MD5($scope.password.confirm).toString();
        // if (newPass !== confirm) {
        //     alert('passwords do not match');
        //     return;
        // }

        $scope.user.password = newPass;
        $scope.user.isEnabled = true;

        var timestamp = UtilSvc.getISO8601DateString();
        $scope.user.createdDate = timestamp;
        $scope.user.updatedDate = timestamp;

        var saveUser = function(user, password) {
            var deferred = $q.defer();
            User.save(user, function(response) {
                deferred.resolve(response.data);
            });
            deferred.promise.then(function() {
                AuthSvc.login(user.id, password,
                    function(result, message) {
                        if(result === true) {
                            $location.path('/ideas');
                            UtilSvc.showHeader();
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
    }

    $scope.cancel = function() {
        $location.path('/login');
    }
});