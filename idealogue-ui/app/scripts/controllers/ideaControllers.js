'use strict';

angular.module('idealogue.ideaControllers', [
    'ngRoute',
    'idealogue.utilityServices',
    'idealogue.coreDirectives',
    'idealogue.ideaServices',
    'idealogue.authServices'
])

.controller('IdeaListCtrl', function($scope, $q, $location, UtilSvc, AuthSvc, ideas) {
    AuthSvc.checkIfLoggedIn();

    ideas.sort(UtilSvc.sortBy('name', false, function(a){return a.toUpperCase()}));
    $scope.ideas = ideas;
    $scope.desc = false

    $scope.toList = function(arr, prop) {
        return UtilSvc.arrayToString(arr, prop);
    };

    $scope.addNew = function() {
        $location.path('/ideas/new');
    };

    $scope.viewIdea = function(ideaId) {
        $location.path('/ideas/view/' + ideaId);
    };

    $scope.sort = function() {
        $scope.desc = $scope.desc ? false : true;
        ideas.sort(UtilSvc.sortBy('name', $scope.desc, function(a){return a.toUpperCase()}));
    };
})

.controller('IdeaViewCtrl', function($route, $scope, $q, $location, UtilSvc, AuthSvc, IdeaSvc, Idea, idea, people) {
    AuthSvc.checkIfLoggedIn();

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
        var id = AuthSvc.currentUser();

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
            id: AuthSvc.currentUser(),
            text: newComment,
            timestamp: UtilSvc.getISO8601DateString()
        };
        Idea.save(idea, function() {
            $route.reload();
        });
    }

    $scope.toList = function(arr, prop) {
        return UtilSvc.arrayToString(arr, prop);
    };

    $scope.printDate = function(dateStr) {
        if (dateStr) {
            return UtilSvc.formatDateString(dateStr);
        }
        return null;
    }
})

.controller('IdeaEditCtrl', function($scope, $q, $location, UtilSvc, AuthSvc, IdeaSvc, Idea, idea, people) {
    AuthSvc.checkIfLoggedIn();

    $scope.idea = idea;
    $scope.people = people;
    IdeaSvc.transformIdeaForEdit($scope.idea);
    IdeaSvc.initializeIdeaForm();

    $scope.save = function() {
        IdeaSvc.transformIdeaForSave($scope.idea);

        // validate data
        if (!IdeaSvc.validateIdeaForm($scope)) {
            return;
        }

        $scope.idea.updatedDate = UtilSvc.getISO8601DateString();

        // save data
        var deferred = $q.defer();
        Idea.save($scope.idea, function(response) {
            deferred.resolve(response.data);
        });
        deferred.promise.then(function() {
            $location.path('/ideas/view/' + $scope.idea.id);
        });
    };

    $scope.cancel = function() {
        $location.path('/ideas/view/' + $scope.idea.id);
    };

    $scope.findProposer = function() {
        $scope.openPersonSearchBox();
    };

    $scope.onPersonSelected = function(person) {
        var value = $scope.idea.proposers
        if (value.length > 0) {
            value += ", ";
        }
        value += person.id;
        $scope.idea.proposers = value;
    };
})

.controller('IdeaNewCtrl', function($scope, $q, $location, UtilSvc, AuthSvc, IdeaSvc, Idea) {
    AuthSvc.checkIfLoggedIn();

    $scope.save = function() {
        IdeaSvc.transformIdeaForSave($scope.idea);

        // validate data
        if (!IdeaSvc.validateIdeaForm($scope)) {
            return;
        }

        var timestamp = UtilSvc.getISO8601DateString();
        $scope.idea.createdDate = timestamp;
        $scope.idea.updatedDate = timestamp;

        // save data
        var deferred = $q.defer();
        Idea.save($scope.idea, function(response) {
            deferred.resolve(response.data);
        });
        deferred.promise.then(function(idea) {
            if (idea) {
                $location.path('/ideas/view/' + idea.id)
            }
        });
    };

    $scope.cancel = function() {
        $location.path('/ideas');
    };

    var dateStr = UtilSvc.getISO8601DateString();
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
        proposers: [ AuthSvc.currentUser() ],
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
    IdeaSvc.initializeIdeaForm();
});