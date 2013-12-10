var loginControllers = angular.module('idealogue.loginControllers', ['idealogue.utilityServices','idealogue.authServices']);

loginControllers.controller('LoginCtrl', function($scope, $location, AuthSvc) {
    $scope.login = { };

    $('#search').hide();
    $('#nav').hide();
    $('#currentUser').hide();

    $('#loginUsername').focus();

    $scope.login = function() {
        AuthSvc.login($scope.login.username, $scope.login.password,
            function(result, message) {
                if(result === true) {
                    $location.path('/ideas');
                    $('#search').fadeIn(100);
                    $('#nav').fadeIn(100);
                    $('#currentUser').fadeIn(100);
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
});

loginControllers.controller('RegisterCtrl', function($scope, $q, $location, User, AuthSvc, UtilSvc) {
    $scope.user = { };
    $scope.password = { };

    $('#search').hide();
    $('#nav').hide();
    $('#currentUser').hide();

    $('#username').focus();

    $scope.save = function() {
        var rawPass = $scope.password.new;
        var newPass = CryptoJS.MD5(rawPass).toString();
        var confirm = CryptoJS.MD5($scope.password.confirm).toString();
        if (newPass !== confirm) {
            alert('passwords do not match');
            return;
        }

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
                            $('#search').fadeIn(100);
                            $('#nav').fadeIn(100);
                            $('#currentUser').fadeIn(100);
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