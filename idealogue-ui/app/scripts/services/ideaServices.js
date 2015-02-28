'use strict';

angular.module('idealogue.ideaServices', [
    'ngResource',
    'idealogue.configServices',
    'idealogue.utilityServices',
    'idealogue.userServices'
])

.factory('Idea', function($http, config) {
    $http.defaults.headers.common.Authorization = config.apiToken;
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
})

.factory('MultiIdeaLoader', function($q, Idea) {
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
})

.factory('IdeaLoader', function($q, Idea) {
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
})

.factory('IdeaSvc', function(UtilSvc) {
    return {
        initializeIdeaForm: function(delay) {
            var $name = $('#ideaName'),
                $summary = $('#ideaSummary'),
                $benefits = $('#ideaBenefits'),
                $details = $('#ideaDetails');

            $name.parent().removeClass('has-error');
            $summary.parent().removeClass('has-error');
            $benefits.parent().removeClass('has-error');
            $details.parent().removeClass('has-error');

            $summary.autoSize();
            $benefits.autoSize();
            $details.autoSize();

            UtilSvc.delay(function() {
                $.resizeTextArea($summary[0]);
                $.resizeTextArea($benefits[0]);
                $.resizeTextArea($details[0]);
                $('#editIdea').find('.focus').focus();
            }, delay || 1);
        },

        validateIdeaForm: function(scope) {
            var $name = $('#ideaName'),
                $summary = $('#ideaSummary'),
                $benefits = $('#ideaBenefits'),
                $details = $('#ideaDetails');

            var idea = scope.idea;
            var isNameValid = idea.name && idea.name !== null || idea.name.trim() !== "";
            var isSummaryValid = idea.summary && idea.summary !== null || idea.summary.trim() !== "";
            var isBenefitsValid = idea.benefits && idea.benefits !== null || idea.benefits.trim() !== "";
            var isDetailsValid = idea.details && idea.details !== null || idea.details.trim() !== "";

            if (isDetailsValid) {
                $details.removeClass('has-error');
            }
            else {
                $details.addClass('has-error');
                $details.focus();
            }

            if (isBenefitsValid) {
                $benefits.removeClass('has-error');
            }
            else {
                $benefits.addClass('has-error');
                $benefits.focus();
            }

            if (isSummaryValid) {
                $summary.removeClass('has-error');
            }
            else {
                $summary.addClass('has-error');
                $summary.focus();
            }

            if (isNameValid) {
                $name.removeClass('has-error');
            }
            else {
                $name.addClass('has-error');
                $name.focus();
            }

            return !(!isNameValid || !isSummaryValid || !isBenefitsValid || !isDetailsValid);
        },

        transformIdeaForView: function(idea, people) {
            var i, len, person;

            var proposerNames = [];
            var index = 0;
            for (i = 0, len = idea.proposers.length; i < len; i++) {
                person = UtilSvc.findInArray(people, 'id', idea.proposers[i]);
                if (person !== null) {
                    proposerNames[index++] = person.firstName + ' ' + person.lastName;
                }
            }
            idea.proposerNames = proposerNames;

            for (i = 0, len = idea.comments.length; i < len; i++) {
                person = UtilSvc.findInArray(people, 'id', idea.comments[i].id);
                if (person !== null) {
                    idea.comments[i]["fullName"] = person.firstName + ' ' + person.lastName;
                }
            }
        },

        transformIdeaForEdit: function(idea) {
            idea.proposers = UtilSvc.arrayToString(idea.proposers);
            idea.skills = UtilSvc.arrayToString(idea.skills);
            idea.technologies = UtilSvc.arrayToString(idea.technologies);
            idea.tags = UtilSvc.arrayToString(idea.tags);
        },

        transformIdeaForSave: function(idea) {
            var i, len;

            if (typeof idea.proposers === 'string') {
                idea.proposers = idea.proposers.split(',');
            }
            for (i = 0, len = idea.proposers.length; i < len; i++) {
                idea.proposers[i] = idea.proposers[i].trim();
            }

            if (typeof idea.skills === 'string') {
                idea.skills = idea.skills.split(',');
            }
            for (i = 0, len = idea.skills.length; i < len; i++) {
                idea.skills[i] = idea.skills[i].trim();
            }

            if (typeof idea.technologies === 'string') {
                idea.technologies = idea.technologies.split(',');
            }
            for (i = 0, len = idea.technologies.length; i < len; i++) {
                idea.technologies[i] = idea.technologies[i].trim();
            }

            if (typeof idea.tags === 'string') {
                idea.tags = idea.tags.split(',');
            }
            for (i = 0, len = idea.tags.length; i < len; i++) {
                idea.tags[i] = idea.tags[i].trim();
            }

            delete idea.proposerNames;
            for (i = 0, len = idea.comments.length; i < len; i++) {
                delete idea.comments[i]['fullName'];
            }
        }
    }
});