var ideaControllers = angular.module('idealogue.ideaControllers', ['idealogue.utilityServices','idealogue.coreDirectives','idealogue.ideaServices']);

ideaControllers.controller('IdeaListCtrl', function($scope, $q, $location, UtilSvc, ideas) {
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

ideaControllers.controller('IdeaViewCtrl', function($route, $scope, $q, $location, UtilSvc, Idea, IdeaSvc, idea, people) {
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
        var id = UtilSvc.randomUUID();
        //TODO: replace random UUID with id of logged in user (when implemented)

        if ($.inArray(id, votes) === -1) {
            votes[votes.length] = id;
            idea.voteCount = parseInt(idea.voteCount)+1;
            Idea.save(idea, function() {
                $location.path('/ideas/view/' + idea.id);
            });
        }
    }

    $scope.addComment = function() {
        $('#ideaNewComment').show();
        $('#ideaAddCommentButton').hide();
    }

    $scope.cancelComment = function() {
        $scope.newComment = null;
        $('#ideaNewComment').hide();
        $('#ideaAddCommentButton').show();
    }

    $scope.saveComment = function() {
        var newComment = $scope.newComment;
        var idea = $scope.idea;

        var comments = idea.comments;
        comments[comments.length] = {
            timestamp: UtilSvc.getISO8601DateString(),
            fullName: 'Dave Laursen',
            text: newComment
        };
        Idea.save(idea, function() {
            $location.path('/ideas/view/' + idea.id);
        });

        $scope.cancelComment();
    }

    $scope.toList = function(arr, prop) {
        return UtilSvc.arrayToString(arr, prop);
    };

    $scope.printDate = function(dateStr) {
        return UtilSvc.formatDateString(dateStr);
    }
});

ideaControllers.controller('IdeaEditCtrl', function($route, $scope, $q, $location, UtilSvc, IdeaSvc, Idea, idea, people) {
    $scope.idea = idea;
    $scope.people = people;
    IdeaSvc.transformIdeaForEdit($scope.idea, $scope.people);
    IdeaSvc.initializeIdeaForm();

    $scope.save = function() {
        IdeaSvc.transformIdeaForSave($scope.idea, $scope.people);

        // validate data
        if (!IdeaSvc.validateIdeaForm($scope)) {
            return;
        }

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
    }

    $scope.executePersonSearch = function() {
        var text = $('#personSearch').val();
        var results;
        if (text === "") {
            results = $scope.people;
        }
        else {
            results = UtilSvc.findMultipleInArray($scope.people, ['firstName','lastName','username'], text);
        }
        results.sort(UtilSvc.sortBy('username', false, function(a){return a.toUpperCase()}));
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
//        alert('person selected: ' + person.id)
    }
});

ideaControllers.controller('IdeaNewCtrl', function($scope, $q, $location, UtilSvc, IdeaSvc, Idea) {
    $scope.save = function() {
        IdeaSvc.transformIdeaForSave($scope.idea);

        // validate data
        if (!IdeaSvc.validateIdeaForm($scope)) {
            return;
        }

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
        proposers: [],
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