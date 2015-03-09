'use strict';

angular.module('idealogue.skillServices', [
])

.factory('Skill', ['$http', 'config', function SkillFactory($http, config) {
    var baseUrl = config.apiUrl + '/skills';
    return {
        getMany: function(success, error) {
            return $http.get(baseUrl).then(success, error);
        },
        save: function(skill, success, error) {
            return $http.put(baseUrl + '/' + skill, {}).then(success, error);
        },
        remove: function(skill, success, error) {
            return $http.delete(baseUrl + '/' + skill).then(success, error);
        }
    }
}])

.factory('MultiSkillLoader', ['$q', 'Skill', function MultiSkillLoaderFactory($q, Skill) {
    return function() {
        var delay = $q.defer();
        Skill.getMany(
            function(response) {
                delay.resolve(response.data);
            },
            function() {
                delay.reject('Unable to fetch skills');
            }
        );
        return delay.promise;
    }
}]);