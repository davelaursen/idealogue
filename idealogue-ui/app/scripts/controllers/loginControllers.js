'use strict';

angular.module('idealogue.loginControllers', [
    'idealogue.utilityServices',
    'idealogue.authServices'
])

.controller('LoginCtrl', ['$scope', '$location', 'Auth', 'Util', function($scope, $location, Auth, Util) {
    $scope.login = { };
    $scope.hideHeader();

    $scope.login = function() {
        Auth.login($scope.login.username, $scope.login.password,
            function(result, message) {
                if(result === true) {
                    $location.path('/ideas');
                    $scope.showHeader();
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
}])

.controller('RegisterCtrl', ['$scope', '$q', '$location', 'Util', 'Auth', 'UserSvc', 'User', function($scope, $q, $location, Util, Auth, UserSvc, User) {
    $scope.user = { };
    $scope.password = { };
    $scope.hideHeader();

    $scope.save = function() {
        if (!UserSvc.validateUserForm($scope)) {
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
            // var deferred = $q.defer();
            User.save(user, function(response) {
                // deferred.resolve(response.data);
                Auth.login(user.id, password,
                    function(result, message) {
                        if(result === true) {
                            $location.path('/ideas');
                            $scope.showHeader();
                        }
                        else {
                            alert(message);
                        }
                    }
                );
            });
            // deferred.promise.then(function() {
            //     Auth.login(user.id, password,
            //         function(result, message) {
            //             if(result === true) {
            //                 $location.path('/ideas');
            //                 $scope.showHeader();
            //             }
            //             else {
            //                 alert(message);
            //             }
            //         }
            //     );
            // });
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
}]);