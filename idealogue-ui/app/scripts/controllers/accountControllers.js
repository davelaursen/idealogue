'use strict';

angular.module('idealogue.accountControllers', [
    'idealogue.utilityServices',
    'idealogue.userServices'
])

.controller('AccountViewCtrl', function($scope, $location, UtilSvc, AuthSvc, User, user) {
    AuthSvc.checkIfLoggedIn();

    $scope.user = user;

    $scope.back = function() {
        $location.path('/people');
    }

    $scope.printDate = function(dateStr) {
        if (dateStr) {
            return UtilSvc.formatDateString(dateStr, true);
        }
        return null;
    }

    $scope.edit = function() {
        $location.path('/account/edit');
    }

    $scope.remove = function() {
        User.remove($scope.user.id, function() {
            AuthSvc.logout();
        });
    }

    $scope.changePassword = function() {
        $location.path('/account/password');
    }
})

.controller('AccountPasswordCtrl', function($route, $scope, $q, $location, UtilSvc, AuthSvc, User, user) {
    AuthSvc.checkIfLoggedIn();

    $scope.user = user;
    $scope.password = { };

    $scope.save = function() {
        var oldPass = CryptoJS.MD5($scope.password.old).toString();
        var newPass = CryptoJS.MD5($scope.password.new).toString();
        var confirm = CryptoJS.MD5($scope.password.confirm).toString();

        if ($scope.user.password !== oldPass) {
            alert('password entered is incorrect');
            return;
        }

        if (newPass !== confirm) {
            alert('new passwords do not match');
            return;
        }

        $scope.user.password = newPass;

        // save data
        var deferred = $q.defer();
        User.save($scope.user, function(response) {
            deferred.resolve(response.data);
        });
        deferred.promise.then(function() {
            $location.path('/account');
        });
    };

    $scope.cancel = function() {
        $location.path('/account');
    };
})

.controller('AccountEditCtrl', function($route, $scope, $q, $location, UtilSvc, AuthSvc, UserSvc, User, user) {
    AuthSvc.checkIfLoggedIn();

    $scope.user = user;
//    UserSvc.transformUserForEdit($scope.user);
    UserSvc.initializeUserForm();


    $scope.save = function() {
//        UserSvc.transformUserForSave($scope.user);

        // validate data
        if (!UserSvc.validateUserForm($scope)) {
            return;
        }

        // save data
        var deferred = $q.defer();
        User.save($scope.user, function(response) {
            deferred.resolve(response.data);
        });
        deferred.promise.then(function() {
            $location.path('/account');
        });
    };

    $scope.cancel = function() {
        $location.path('/account');
    };
});