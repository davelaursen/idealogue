'use strict';

angular.module('idealogue.ideaServices', [
    'ngResource',
    'idealogue.configServices',
    'idealogue.utilityServices',
    'idealogue.userServices'
])

.factory('Idea', ['$http', 'config', function IdeaFactory($http, config) {
    var baseUrl = config.apiUrl + '/ideas';
    return {
        getMany: function(success, error) {
            return $http.get(baseUrl).then(success, error);
        },
        getOne: function(ideaId, success, error) {
            return $http.get(baseUrl + '/' + ideaId).then(success, error);
        },
        save: function(idea, success, error) {
            if (idea.id) {
                return $http.put(baseUrl + '/' + idea.id, idea).then(success, error);
            }
            else {
                return $http.post(baseUrl, idea).then(success, error);
            }
        },
        remove: function(ideaId, success, error) {
            return $http.delete(baseUrl + '/' + ideaId).then(success, error);
        }
    }
}])

.factory('MultiIdeaLoader', ['$q', 'Idea', function MultiIdeaLoaderFactory($q, Idea) {
    return function() {
        var delay = $q.defer();
        Idea.getMany(
            function(response) {
                delay.resolve(response.data);
            },
            function() {
                delay.reject('Unable to fetch ideas');
            }
        );
        return delay.promise;
    }
}])

.factory('IdeaLoader', ['$q', 'Idea', function IdeaLoaderFactory($q, Idea) {
    return function(ideaId) {
        var delay = $q.defer();
        Idea.getOne(ideaId,
            function(response) {
                delay.resolve(response.data);
            },
            function() {
                delay.reject('Unable to fetch idea ' + ideaId)
            }
        );
        return delay.promise;
    }
}])

.factory('IdeaSvc', ['$timeout', 'Util', function IdeaSvcFactory($timeout, Util) {
    return {
        transformIdeaForView: function(idea, people) {
            var i, len, person;

            var proposerNames = [];
            var index = 0;
            for (i = 0, len = idea.proposers.length; i < len; i++) {
                person = Util.findInArray(people, 'id', idea.proposers[i]);
                if (person !== null) {
                    proposerNames[index++] = person.firstName + ' ' + person.lastName;
                }
            }
            idea.proposerNames = proposerNames;

            for (i = 0, len = idea.comments.length; i < len; i++) {
                person = Util.findInArray(people, 'id', idea.comments[i].id);
                if (person !== null) {
                    idea.comments[i]["fullName"] = person.firstName + ' ' + person.lastName;
                }
            }
        },

        transformIdeaForEdit: function(idea, people) {
            var proposerObjs = [];
            var index = 0;
            for (var i = 0, len = idea.proposers.length; i < len; i++) {
                var person = Util.findInArray(people, 'id', idea.proposers[i]);
                if (person !== null) {
                    proposerObjs[index++] = person;
                }
            }
            idea.proposers = proposerObjs;
        },

        transformIdeaForSave: function(idea) {
            var i, len;

            for (i = 0, len = idea.proposers.length; i < len; i++) {
                idea.proposers[i] = idea.proposers[i].id;
            }

            delete idea.proposerNames;
            for (i = 0, len = idea.comments.length; i < len; i++) {
                delete idea.comments[i]['fullName'];
            }
        }
    }
}]);