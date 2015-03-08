'use strict';

angular.module('idealogue.authServices', [
    'ngCookies',
    'idealogue.userServices'
])

.factory('Auth', ['$q', '$location', '$cookieStore', 'User', function AuthFactory($q, $location, $cookieStore, User) {
    return {
        login: function(username, password, callback) {
            var deferred = $q.defer();
            User.getOne(username,
                function(response) {
                    deferred.resolve(response.data);
                },
                function() {
                    deferred.reject();
                    callback(false, "user '" + username + "' does not exist");
                }
            );

            deferred.promise.then(function(user) {
                if (user.password === CryptoJS.MD5(password).toString()) {
                    $cookieStore.put('currentUser', user);
                    callback(true);
                }
                else {
                    callback(false, 'credentials are invalid');
                }
            });
        },

        logout: function() {
            $cookieStore.remove('currentUser');
            $location.path('/login');
        },

        isLoggedIn: function() {
            var currentUser = $cookieStore.get('currentUser');
            if (!currentUser || currentUser == null) {
                return false;
            }
            return true;
        },

        checkIfLoggedIn: function(redirect) {
            var currentUser = $cookieStore.get('currentUser');
            if (!currentUser || currentUser == null) {
                if (redirect) {
                    redirect();
                }
                else {
                    $location.path('/login');
                }
            }
        },

        currentUser: function() {
            return $cookieStore.get('currentUser');
        },

        currentUserName: function() {
            var user = $cookieStore.get('currentUser');
            if (!user) {
                return "";
            }
            return user.firstName + ' ' + user.lastName;
        },

        setCurrentUser: function(user) {
            return $cookieStore.put('currentUser', user);
        }
    };
}]);