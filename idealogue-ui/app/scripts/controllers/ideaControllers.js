'use strict';

angular.module('idealogue.ideaControllers', [
    'ngRoute',
    'idealogue.utilityServices',
    'idealogue.coreDirectives',
    'idealogue.ideaServices',
    'idealogue.authServices',
    'idealogue.eventingServices'
])

.controller('IdeaListCtrl', ['$rootScope', '$scope', '$location', 'Util', 'Auth', 'Events', 'ideas', function($rootScope, $scope, $location, Util, Auth, Events, ideas) {
    Auth.checkIfLoggedIn();

    ideas.sort(Util.sortBy('name', false, function(a){return a.toUpperCase()}));
    $scope.ideas = ideas;
    $scope.desc = false;
    $scope.hideFilter = true;

    $scope.toList = function(arr, prop) {
        return Util.arrayToString(arr, prop);
    };

    $scope.addNew = function() {
        $location.path('/ideas/new');
    };

    $scope.viewIdea = function(ideaId) {
        $location.path('/ideas/view/' + ideaId);
    };

    $scope.sort = function() {
        $scope.desc = !$scope.desc;
        ideas.sort(Util.sortBy('name', $scope.desc, function(a){return a.toUpperCase()}));
    };

    $scope.filter = function() {
        $scope.hideFilter = !$scope.hideFilter;
        $rootScope.$broadcast(Events.hideListFilterEvent, $scope.hideFilter);
    };
}])

.controller('IdeaViewCtrl', ['$route', '$scope', '$location', 'Util', 'Auth', 'IdeaSvc', 'Idea', 'idea', 'people', function($route, $scope, $location, Util, Auth, IdeaSvc, Idea, idea, people) {
    Auth.checkIfLoggedIn();

    IdeaSvc.transformIdeaForView(idea, people);
    $scope.idea = idea;

    $scope.back = function() {
        $location.path('/ideas');
    }

    $scope.edit = function() {
        $location.path('/ideas/edit/' + $scope.idea.id);
    }

    $scope.remove = function() {
        Idea.remove($scope.idea.id, $scope.back);
    }

    $scope.vote = function() {
        var idea = $scope.idea;
        var votes = idea.votes;
        var id = Auth.currentUser();

        if ($.inArray(id, votes) === -1) {
            votes[votes.length] = id;
            idea.voteCount = parseInt(idea.voteCount)+1;
            
            IdeaSvc.transformIdeaForSave(idea);
            Idea.save(idea, function() {
                $route.reload();
            });
        }
    }

    $scope.save = function() {
        var newComment = $scope.newComment;
        var idea = $scope.idea;

        IdeaSvc.transformIdeaForSave(idea);

        idea.comments[idea.comments.length] = {
            id: Auth.currentUser(),
            text: newComment,
            timestamp: Util.getISO8601DateString()
        };
        Idea.save(idea, function() {
            $route.reload();
        });
    }

    $scope.toList = function(arr, prop) {
        return Util.arrayToString(arr, prop);
    };
}])

.controller('IdeaCommentsCtrl', ['$scope', '$element', function($scope, $element) {
    $element.find('.comment-new-text').autoSize();

    $scope.addComment = function() {
        $element.find('.comment-new').show();
        $element.find('.add-comment-button').hide();
        $element.find('.comment-new-text').focus();
    };

    $scope.cancelComment = function() {
        $scope.newComment = null;
        $element.find('.comment-new').hide();
        $element.find('.add-comment-button').show();
    };

    $scope.saveComment = function() {
        $scope.save();
        $scope.cancelComment();
    };
}])

.controller('IdeaEditCtrl', ['$scope', '$location', 'Util', 'Auth', 'IdeaSvc', 'Idea', 'idea', function($scope, $location, Util, Auth, IdeaSvc, Idea, idea) {
    Auth.checkIfLoggedIn();

    $scope.idea = idea;
    IdeaSvc.transformIdeaForEdit($scope.idea);
    IdeaSvc.initializeIdeaForm();

    $scope.save = function(form) {
        if (!form.$valid) {
            return;
        }

        IdeaSvc.transformIdeaForSave($scope.idea);
        $scope.idea.updatedDate = Util.getISO8601DateString();

        // save data
        Idea.save($scope.idea, function(response) {
            $location.path('/ideas/view/' + $scope.idea.id);
        });
    };

    $scope.cancel = function() {
        $location.path('/ideas/view/' + $scope.idea.id);
    };

    $scope.findProposer = function() {
        $scope.openPersonSearchBox(
            function(person) {
                var value = $scope.idea.proposers
                if (value.length > 0) {
                    value += ", ";
                }
                value += person.id;
                $scope.idea.proposers = value;
            }
        );
    };

    $scope.onPersonSelected = function(person) {
        var value = $scope.idea.proposers
        if (value.length > 0) {
            value += ", ";
        }
        value += person.id;
        $scope.idea.proposers = value;
    };
}])

.controller('IdeaNewCtrl', ['$scope', '$location', 'Util', 'Auth', 'IdeaSvc', 'Idea', function($scope, $location, Util, Auth, IdeaSvc, Idea) {
    Auth.checkIfLoggedIn();

    $scope.save = function(form) {
        if (!form.$valid) {
            for (var prop in form) {
                if (form.hasOwnProperty(prop) && prop.indexOf('$', 0) === -1) {
                    form[prop].$touched = true;
                }
            }
            return;
        }

        IdeaSvc.transformIdeaForSave($scope.idea);

        var timestamp = Util.getISO8601DateString();
        $scope.idea.createdDate = timestamp;
        $scope.idea.updatedDate = timestamp;

        // save data
        Idea.save($scope.idea, function(response) {
            $location.path('/ideas/view/' + response.data.id)
        });
    };

    $scope.cancel = function() {
        $location.path('/ideas');
    };

    var dateStr = Util.getISO8601DateString();
    $scope.idea = {
        name: "",
        summary: "",
        benefits: "",
        details: "",
        state: "Idea",
        tags: [],
        skills: [],
        technologies: [],
        repo: "myrepo",
        proposers: [ Auth.currentUser().id ],
        contributors: [],
        contributorRequests: [],
        isPublic: false,
        votes: [],
        voteCount: 0,
        comments: [],
        createdDate: dateStr,
        updatedDate: dateStr
    };

    IdeaSvc.transformIdeaForEdit($scope.idea);
}]);