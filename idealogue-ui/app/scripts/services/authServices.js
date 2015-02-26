var authServices = angular.module('idealogue.authServices', ['ngCookies','idealogue.userServices']);

authServices.factory('AuthSvc', function($q, $location, $cookieStore, User) {
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
                    $cookieStore.put('currentUser', user.id);
                    $cookieStore.put('currentUserName', user.firstName + " " + user.lastName)
                    callback(true);
                }
                else {
                    callback(false, 'credentials are invalid');
                }
            });
        },

        logout: function() {
            $cookieStore.remove('currentUser');
            $cookieStore.remove('currentUserName');
            $location.path('/login');
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
            return $cookieStore.get('currentUserName');
        }
    };
});