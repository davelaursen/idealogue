'use strict';

angular.module('idealogue.userServices', [
    'ngResource',
    'idealogue.configServices',
    'idealogue.utilityServices'
])

.factory('User', function($http, ConfigSvc) {
    $http.defaults.headers.common.Authorization = ConfigSvc.apiToken;
    var baseUrl = ConfigSvc.restBaseUrl + '/users';
    return {
        getMany: function(success, error) {
            return $http.get(baseUrl).then(success, error);
        },
        getOne: function(userId, success, error) {
            return $http.get(baseUrl + '/' + userId).then(success, error);
        },
        save: function(user, success, error) {
            return $http.put(baseUrl + '/' + user.id, user).then(success, error);
        },
        remove: function(userId, success, error) {
            return $http.delete(baseUrl + '/' + userId).then(success, error);
        }
    }
})

.factory('MultiUserLoader', function($q, User) {
    return function() {
        var delay = $q.defer();
        User.getMany(
            function(response) {
                delay.resolve(response.data);
            },
            function() {
                delay.reject('Unable to fetch users');
            }
        );
        return delay.promise;
    }
})

.factory('UserLoader', function($q, User) {
    return function(userId) {
        var delay = $q.defer();
        User.getOne(userId,
            function(response) {
                delay.resolve(response.data);
            },
            function() {
                delay.reject('Unable to fetch user ' + userId)
            }
        );
        return delay.promise;
    }
})

.service('UserSvc', function() {
    return {
        initializeUserForm: function() {
            var $id = $('#userId'),
                $firstName = $('#userFirstName'),
                $lastName = $('#userLastName'),
                $email = $('#userEmail'),
                $newPass = $('#newPassword'),
                $confirmPass = $('#confirmPassword');

            $id.removeClass('has-error');
            $firstName.removeClass('has-error');
            $lastName.removeClass('has-error');
            $email.removeClass('has-error');
            $newPass.removeClass('has-error');
            $confirmPass.removeClass('has-error');
        },

        validateUserForm: function(scope) {
            var $id = $('#userId'),
                $firstName = $('#userFirstName'),
                $lastName = $('#userLastName'),
                $email = $('#userEmail'),
                $newPass = $('#newPassword'),
                $confirmPass = $('#confirmPassword');

            var user = scope.user;
            var isIdValid = user.id !== undefined && user.id !== null && user.id.trim() !== "";
            var isFirstNameValid = user.firstName !== undefined && user.firstName !== null && user.firstName.trim() !== "";
            var isLastNameValid = user.lastName !== undefined && user.lastName !== null && user.lastName.trim() !== "";
            var isEmailValid = user.email !== undefined && user.email !== null && user.email.trim() !== "";

            var pass = scope.password;
            var isNewPassValid = true;
            var isConfirmPassValid = true;
            var alertMsg = null;
            if (pass) {
                isNewPassValid = pass.new !== undefined && pass.new !== null && pass.new.trim() !== "";
                isConfirmPassValid = pass.confirm !== undefined && pass.confirm !== null && pass.confirm.trim() !== "";

                if (isNewPassValid && isConfirmPassValid) {
                    var rawPass = pass.new;
                    var newPass = CryptoJS.MD5(rawPass).toString();
                    var confirm = CryptoJS.MD5(pass.confirm).toString();
                    if (newPass !== confirm) {
                        isConfirmPassValid = false;
                        alertMsg = 'passwords do not match';
                    }
                }
            }

            var focus = null;
            if (isIdValid) {
                $id.removeClass('has-error');
            }
            else {
                $id.addClass('has-error');
                focus = focus || $id;
            }

            if (isFirstNameValid) {
                $firstName.removeClass('has-error');
            }
            else {
                $firstName.addClass('has-error');
                focus = focus || $firstName;
            }

            if (isLastNameValid) {
                $lastName.removeClass('has-error');
            }
            else {
                $lastName.addClass('has-error');
                focus = focus || $lastName;
            }

            if (isEmailValid) {
                $email.removeClass('has-error');
            }
            else {
                $email.addClass('has-error');
                focus = focus || $email;
            }

            if (isNewPassValid) {
                $newPass.removeClass('has-error');
            }
            else {
                $newPass.addClass('has-error');
                focus = focus || $newPass;
            }

            if (isConfirmPassValid) {
                $confirmPass.removeClass('has-error');
            }
            else {
                $confirmPass.addClass('has-error');
                focus = focus || $confirmPass;
            }

            if (alertMsg !== null) {
                alert(alertMsg);
            }
            if (focus !== null) {
                focus.focus();
            }

            return !(!isIdValid || !isFirstNameValid || !isLastNameValid || !isEmailValid || !isNewPassValid || !isConfirmPassValid);
        }
    }
});