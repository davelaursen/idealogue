var ideaControllers = angular.module('idealogue.ideaControllers', ['ngRoute','idealogue.utilityServices','idealogue.coreDirectives','idealogue.ideaServices','idealogue.authServices']);

ideaControllers.controller('IdeaListCtrl', function($scope, $q, $location, UtilSvc, ideas, AuthSvc) {
    AuthSvc.checkIfLoggedIn();

    ideas.sort(UtilSvc.sortBy('name', false, function(a){return a.toUpperCase()}));
    $scope.ideas = ideas;

    $scope.toList = function(arr, prop) {
        return UtilSvc.arrayToString(arr, prop);
    };

    $scope.addNew = function() {
        $location.path('/ideas/new');
    };

    $scope.viewIdea = function(ideaId) {
        $location.path('/ideas/view/' + ideaId);
    }
});

ideaControllers.controller('IdeaViewCtrl', function($route, $scope, $q, $location, UtilSvc, Idea, IdeaSvc, idea, people, AuthSvc) {
    AuthSvc.checkIfLoggedIn();

    IdeaSvc.transformIdeaForView(idea, people);
    $scope.idea = idea;
    $('#newCommentText').autoSize();

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
            Idea.save(idea, function() {
                $route.reload();
            });
        }
    }

    $scope.addComment = function() {
        $('#ideaNewComment').show();
        $('#ideaAddCommentButton').hide();
        $('#newCommentText').focus();
    }

    $scope.cancelComment = function() {
        $scope.newComment = null;
        $('#ideaNewComment').hide();
        $('#ideaAddCommentButton').show();
    }

    $scope.saveComment = function() {
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

        $scope.cancelComment();
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
});

ideaControllers.controller('IdeaEditCtrl', function($scope, $q, $location, UtilSvc, IdeaSvc, Idea, idea, people, AuthSvc) {
    AuthSvc.checkIfLoggedIn();

    $('#editIdeaTitle').text('Edit Idea');

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
        $('#shadow').fadeIn(100);
        $('#personSearchBox').fadeIn(100);
        $('#personSearch').focus();
        $('#personSearchFieldName').val('proposers');
    }

    $scope.closePersonSearchBox = function() {
        $('#shadow').fadeOut(100);
        $('#personSearchBox').fadeOut(100);
        $scope.personSearchResults = [];
    }

    $scope.executePersonSearch = function() {
        var text = $('#personSearch').val();
        var results;
        if (text === "") {
            results = $scope.people;
        }
        else {
            results = UtilSvc.findMultipleInArray($scope.people, ['firstName','lastName','id'], text);
        }
        results.sort(UtilSvc.sortBy('id', false, function(a){return a.toUpperCase()}));
        $scope.personSearchResults = results;
    }

    $scope.selectPerson = function(person) {
        var field = $('#personSearchFieldName').val();
        var value = $scope.idea[field];
        if (value.length > 0) {
            value += ", ";
        }
        value += person.username;
        $scope.idea[field] = value;
        $scope.closePersonSearchBox();
    }
});

ideaControllers.controller('IdeaNewCtrl', function($scope, $q, $location, UtilSvc, IdeaSvc, Idea, AuthSvc) {
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

    $('#editIdeaTitle').text('New Idea');
    $('#proposersGroup').hide();

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