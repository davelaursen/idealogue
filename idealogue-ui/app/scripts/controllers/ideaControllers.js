'use strict';

angular.module('idealogue.ideaControllers', [
    'ngRoute',
    'idealogue.utilityServices',
    'idealogue.coreDirectives',
    'idealogue.ideaServices',
    'idealogue.authServices'
])

.controller('IdeaListCtrl', ['$scope', '$location', 'Util', 'Auth', 'ideas', function($scope, $location, Util, Auth, ideas) {
    Auth.checkIfLoggedIn();

    ideas.sort(Util.sortBy('name', false, function(a){return a.toUpperCase()}));
    $scope.ideas = ideas;
    $scope.desc = false

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
        $scope.desc = $scope.desc ? false : true;
        ideas.sort(Util.sortBy('name', $scope.desc, function(a){return a.toUpperCase()}));
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
                console.log("saved");
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

    $scope.printDate = function(dateStr) {
        if (dateStr) {
            return Util.formatDateString(dateStr);
        }
        return null;
    }
}])

.controller('IdeaEditCtrl', ['$scope', '$location', 'Util', 'Auth', 'IdeaSvc', 'Idea', 'idea', function($scope, $location, Util, Auth, IdeaSvc, Idea, idea) {
    Auth.checkIfLoggedIn();

    $scope.idea = idea;
    IdeaSvc.transformIdeaForEdit($scope.idea);
    IdeaSvc.initializeIdeaForm();

    $scope.save = function() {
        IdeaSvc.transformIdeaForSave($scope.idea);

        // validate data
        if (!IdeaSvc.validateIdeaForm($scope)) {
            return;
        }

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
            100,
            function() {
                $scope.disableMainUIElements();
            },
            function() {
                $scope.enableMainUIElements();
            },
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

    $scope.save = function() {
        IdeaSvc.transformIdeaForSave($scope.idea);

        // validate data
        if (!IdeaSvc.validateIdeaForm($scope)) {
            return;
        }

        var timestamp = Util.getISO8601DateString();
        $scope.idea.createdDate = timestamp;
        $scope.idea.updatedDate = timestamp;

        // save data
        Idea.save($scope.idea, function(response) {
            console.log(response)
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
    // IdeaSvc.initializeIdeaForm();
}]);