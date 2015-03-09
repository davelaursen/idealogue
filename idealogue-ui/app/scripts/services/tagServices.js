'use strict';

angular.module('idealogue.tagServices', [
])

.factory('Tag', ['$http', 'config', function TagFactory($http, config) {
    var baseUrl = config.apiUrl + '/tags';
    return {
        getMany: function(success, error) {
            return $http.get(baseUrl).then(success, error);
        },
        save: function(tag, success, error) {
            return $http.put(baseUrl + '/' + tag, {}).then(success, error);
        },
        remove: function(tag, success, error) {
            return $http.delete(baseUrl + '/' + tag).then(success, error);
        }
    }
}])

.factory('MultiTagLoader', ['$q', 'Tag', function MultiTagLoaderFactory($q, Tag) {
    return function() {
        var delay = $q.defer();
        Tag.getMany(
            function(response) {
                delay.resolve(response.data);
            },
            function() {
                delay.reject('Unable to fetch tags');
            }
        );
        return delay.promise;
    }
}]);