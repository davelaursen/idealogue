'use strict';

angular.module('idealogue.userServices', [])

.factory('User', ['$http', 'config', function UserFactory($http, config) {
    var baseUrl = config.apiUrl + '/users';
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
}])

.factory('MultiUserLoader', ['$q', 'User', function MultiUserLoaderFactory($q, User) {
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
}])

.factory('UserLoader', ['$q', 'User', function UserLoaderFactory($q, User) {
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
}]);