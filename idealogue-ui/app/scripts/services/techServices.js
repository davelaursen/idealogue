'use strict';

angular.module('idealogue.techServices', [])

.factory('Tech', ['$http', 'config', function TechFactory($http, config) {
    var baseUrl = config.apiUrl + '/technologies';
    return {
        getMany: function(success, error) {
            return $http.get(baseUrl).then(success, error);
        },
        save: function(tech, success, error) {
            return $http.put(baseUrl + '/' + tech, {}).then(success, error);
        },
        remove: function(tech, success, error) {
            return $http.delete(baseUrl + '/' + tech).then(success, error);
        }
    }
}])

.factory('MultiTechLoader', ['$q', 'Tech', function MultiTechLoaderFactory($q, Tech) {
    return function() {
        var delay = $q.defer();
        Tech.getMany(
            function(response) {
                delay.resolve(response.data);
            },
            function() {
                delay.reject('Unable to fetch techs');
            }
        );
        return delay.promise;
    }
}]);