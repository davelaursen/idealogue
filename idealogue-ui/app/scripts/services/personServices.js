var personServices = angular.module('idealogue.personServices', ['ngResource','idealogue.configServices','idealogue.utilityServices']);

personServices.config(function($httpProvider) {
    $httpProvider.defaults.headers.common.Authorization = "c4088588-3c0e-11e3-bee0-ce3f5508acd9";
});

personServices.factory('Person', function($http, $q, ConfigSvc) {
    var baseUrl = ConfigSvc.restBaseUrl + '/users';
    return {
        getMany: function(success, error) {
            return $http.get(baseUrl).then(success, error);
        },
        getOne: function(personId, success, error) {
            return $http.get(baseUrl + '/' + personId).then(success, error);
        },
        save: function(person, success, error) {
            if (person.id) {
                return $http.put(baseUrl + '/' + person.id, person).then(success, error);
            }
            else {
                return $http.post(baseUrl, person).then(success, error);
            }
        },
        remove: function(personId, success, error) {
            return $http.delete(baseUrl + '/' + personId).then(success, error);
        }
    }
});

personServices.factory('MultiPersonLoader', function($q, Person) {
    return function() {
        var delay = $q.defer();
        Person.getMany(
            function(response) {
                delay.resolve(response.data);
            },
            function() {
                delay.reject('Unable to fetch people');
            }
        );
        return delay.promise;
    }
});

personServices.factory('PersonLoader', function($q, $route, Person) {
    return function() {
        var delay = $q.defer();
        Person.getOne($route.current.params.personId,
            function(response) {
                delay.resolve(response.data);
            },
            function() {
                delay.reject('Unable to fetch person ' + $route.current.params.personId)
            }
        );
        return delay.promise;
    }
});