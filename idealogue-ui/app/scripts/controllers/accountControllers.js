'use strict';

angular.module('idealogue.accountControllers', [
    'idealogue.utilityServices',
    'idealogue.userServices'
])

.controller('AccountViewCtrl', ['$scope', '$location', 'Util', 'Auth', 'User', 'user', function($scope, $location, Util, Auth, User, user) {
    Auth.checkIfLoggedIn();

    $scope.user = user;

    $scope.back = function() {
        $location.path('/people');
    }

    $scope.edit = function() {
        $location.path('/account/edit');
    }

    $scope.remove = function() {
        User.remove($scope.user.id, function() {
            Auth.logout();
        });
    }

    $scope.changePassword = function() {
        $location.path('/account/password');
    }
}])

.controller('AccountPasswordCtrl', ['$route', '$scope', '$location', 'Util', 'Auth', 'User', 'user', function($route, $scope, $location, Util, Auth, User, user) {
    Auth.checkIfLoggedIn();

    $scope.user = user;
    $scope.password = { };
    $scope.oldPasswordInvalid = false;

    $scope.save = function(form) {
        if (!form.$valid) {
            return;
        }

        var oldPass = CryptoJS.MD5($scope.password.old).toString();
        var newPass = CryptoJS.MD5($scope.password.new).toString();
        var confirm = CryptoJS.MD5($scope.password.confirm).toString();
        if ($scope.user.password !== oldPass) {
            $scope.oldPasswordInvalid = true;
            return;
        }

        $scope.user.password = newPass;

        // save data
        User.save($scope.user, function(response) {
            $location.path('/account');
        });
    };

    $scope.cancel = function() {
        $location.path('/account');
    };
}])

.controller('AccountEditCtrl', ['$route', '$scope', '$location', 'Util', 'Auth', 'User', 'user', function($route, $scope, $location, Util, Auth, User, user) {
    Auth.checkIfLoggedIn();

    $scope.user = user;


    $scope.save = function(form) {
        if (!form.$valid) {
            return;
        }

        // save data
        User.save($scope.user, function(response) {
            $location.path('/account');
        });
    };

    $scope.cancel = function() {
        $location.path('/account');
    };
}]);