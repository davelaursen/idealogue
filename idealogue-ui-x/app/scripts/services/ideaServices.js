var ideaServices = angular.module('idealogue.ideaServices', ['ngResource','idealogue.configServices','idealogue.utilityServices']);

ideaServices.config(function($httpProvider) {
    $httpProvider.defaults.headers.common.Authorization = "c4088588-3c0e-11e3-bee0-ce3f5508acd9";
});

ideaServices.factory('Idea', function($http, ConfigSvc) {
    var baseUrl = ConfigSvc.restBaseUrl + '/ideas';
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
});

ideaServices.service('IdeaSvc', function($q, Idea, UtilSvc) {
    return {
        loadIdeas: function() {
            UtilSvc.changeLocation('/ideas');

            var scope = angular.element('#ideaList').scope();
            scope.ideas = [];

            var deferred = $q.defer();
            Idea.getMany(
                function(response) {
                    deferred.resolve(response.data);
                },
                function() {
                    deferred.reject('Unable to fetch ideas');
                }
            );
            deferred.promise.then(function(ideas) {
                ideas.sort(UtilSvc.sortBy('name', false, function(a){return a.toUpperCase()}));
                scope.ideas = ideas;
            });
        },

        loadIdea: function(ideaId) {
            UtilSvc.changeLocation('/ideas/view/'+ideaId);

            $('#ideaForm').hide();
            $('#ideaView').fadeIn(100);
            $('#newCommentLine').hide();

            if (ideaId) {
                var scope = angular.element('#ideaView').scope();
                var deferred = $q.defer();
                Idea.getOne(ideaId,
                    function(response) {
                        deferred.resolve(response.data);
                    },
                    function() {
                        deferred.reject('Unable to fetch idea ' + ideaId);
                    }
                );
                deferred.promise.then(function(idea) {
                    scope.idea = idea;
                    scope.newComment = null;
                });
            }
        },

        editIdea: function(ideaId) {
            UtilSvc.changeLocation('/ideas/edit/'+ideaId);

            $('#ideaView').hide();
            $('#ideaForm').fadeIn(100);

            if (ideaId) {
                var scope = angular.element('#ideaForm').scope();
                var deferred = $q.defer();
                Idea.getOne(ideaId,
                    function(response) {
                        deferred.resolve(response.data);
                    },
                    function() {
                        deferred.reject('Unable to fetch idea ' + ideaId);
                    }
                );

                var self = this;
                deferred.promise.then(function(idea) {
                    scope.idea = idea;
                    UtilSvc.transformIdeaForEdit(scope.idea);
                    self.initializeIdeaForm();
                });
            }
        },

        newIdea: function() {
            UtilSvc.changeLocation('/ideas/new');

            $('#ideaView').hide();
            $('#ideaForm').show();

            var scope = angular.element('#ideaForm').scope();
            scope.idea = {
                name: "",
                summary: "",
                benefits: "",
                details: "",
                state: "Idea",
                tags: [],
                skills: [],
                technologies: [],
                repo: "myrepo",
                proposers: [],
                contributors: [],
                contributorRequests: [],
                isPublic: false,
                votes: [],
                voteCount: 0,
                comments: [],
                createdDate: "2013-04-23T16:13:56.001Z",
                updatedDate: "2013-04-23T16:13:56.001Z"
            };

            UtilSvc.transformIdeaForEdit(scope.idea);
            this.initializeIdeaForm();
        },

        initializeIdeaForm: function(delay) {
            var $name = $('#name'),
                $summary = $('#summary'),
                $benefits = $('#benefits'),
                $details = $('#details');

            $name.parent().removeClass('has-error');
            $summary.parent().removeClass('has-error');
            $benefits.parent().removeClass('has-error');
            $details.parent().removeClass('has-error');

            UtilSvc.delay(function() {
                $.resizeTextArea($summary[0]);
                $.resizeTextArea($benefits[0]);
                $.resizeTextArea($details[0]);
                $('#ideaForm').find('.focus').focus();
            }, delay || 1);
        },

        validateIdeaForm: function(scope) {
            var $name = $('#name'),
                $summary = $('#summary'),
                $benefits = $('#benefits'),
                $details = $('#details');

            var idea = scope.idea;
            var isNameValid = idea.name && idea.name !== null || idea.name.trim() !== "";
            var isSummaryValid = idea.summary && idea.summary !== null || idea.summary.trim() !== "";
            var isBenefitsValid = idea.benefits && idea.benefits !== null || idea.benefits.trim() !== "";
            var isDetailsValid = idea.details && idea.details !== null || idea.details.trim() !== "";

            if (isDetailsValid) {
                $details.parent().removeClass('has-error');
            }
            else {
                $details.parent().addClass('has-error');
                $details.focus();
            }

            if (isBenefitsValid) {
                $benefits.parent().removeClass('has-error');
            }
            else {
                $benefits.parent().addClass('has-error');
                $benefits.focus();
            }

            if (isSummaryValid) {
                $summary.parent().removeClass('has-error');
            }
            else {
                $summary.parent().addClass('has-error');
                $summary.focus();
            }

            if (isNameValid) {
                $name.parent().removeClass('has-error');
            }
            else {
                $name.parent().addClass('has-error');
                $name.focus();
            }

            return !(!isNameValid || !isSummaryValid || !isBenefitsValid || !isDetailsValid);
        }
    }
});