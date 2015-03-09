'use strict';

angular.module('idealogue.ideaControllers', [])

.controller('IdeaListCtrl', ['$scope', '$location', 'Util', 'ideas', function($scope, $location, Util, ideas) {
    $scope.showHeader();

    ideas.sort(Util.sortBy('name', false, function(a){return a.toUpperCase()}));
    $scope.ideas = ideas;
    $scope.desc = false;

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
        $scope.toggleFilter();
    };
}])

.controller('IdeaViewCtrl', ['$scope', '$location', 'Util', 'Auth', 'IdeaSvc', 'Idea', 'idea', 'people', function($scope, $location, Util, Auth, IdeaSvc, Idea, idea, people) {
    $scope.showHeader();

    IdeaSvc.populateIdea(idea, people);
    $scope.idea = idea;
    $scope.people = people;

    $scope.back = function() {
        $location.path('/ideas');
    };

    $scope.edit = function() {
        $location.path('/ideas/edit/' + $scope.idea.id);
    };

    $scope.remove = function() {
        Idea.remove($scope.idea.id, $scope.back);
    };

    $scope.vote = function() {
        var idea = $scope.idea,
            votes = idea.votes,
            id = Auth.currentUser().id;

        var found = Util.findInArray(votes, id);
        if (found === null) {
            votes.push(id);
            idea.voteCount = parseInt(idea.voteCount)+1;
            
            IdeaSvc.stripIdea(idea);
            Idea.save(idea, function() {
                IdeaSvc.populateIdea(idea, $scope.people);
            });
        }
    };

    $scope.toList = function(arr, prop) {
        return Util.arrayToString(arr, prop);
    };
}])

.controller('IdeaCommentsCtrl', ['$scope', 'Util', 'Auth', 'IdeaSvc', 'Idea', function($scope, Util, Auth, IdeaSvc, Idea) {
    $scope.addComment = function() {
        $scope.showNewComment = true;
        $scope.hideAddCommentButton = true;
    };

    $scope.cancelComment = function() {
        $scope.newComment = null;
        $scope.showNewComment = false;
        $scope.hideAddCommentButton = false;
    };

    $scope.saveComment = function() {
        var newComment = $scope.newComment,
            idea = $scope.idea;

        var user = Auth.currentUser();
        idea.comments.push({
            id: user.id,
            text: newComment,
            timestamp: Util.getISO8601DateString(),
            person: user
        });
        IdeaSvc.stripIdea(idea);

        Idea.save(idea, function() {
            IdeaSvc.populateIdea(idea, $scope.people);
        });
        $scope.cancelComment();
    };
}])

.controller('IdeaEditCtrl', ['$scope', '$location', 'Util', 'IdeaSvc', 'Idea', 'idea', 'people', 'skills', 'techs', 'tags', function($scope, $location, Util, IdeaSvc, Idea, idea, people, skills, techs, tags) {
    $scope.showHeader();

    IdeaSvc.populateIdea(idea, people);
    $scope.idea = idea;
    $scope.skills = skills;
    $scope.techs = techs;
    $scope.tags = tags;

    var sortFunc = function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    };
    skills.sort(sortFunc);
    techs.sort(sortFunc);
    tags.sort(sortFunc);

    $scope.save = function(form) {
        if (!form.$valid) {
            return;
        }

        var idea = $scope.idea;
        IdeaSvc.stripIdea(idea);
        idea.updatedDate = Util.getISO8601DateString();

        // save data
        Idea.save(idea, function(response) {
            $location.path('/ideas/view/' + idea.id);
        });
    };

    $scope.cancel = function() {
        $location.path('/ideas/view/' + $scope.idea.id);
    };

    $scope.removeProposer = function(index) {
        $scope.idea.proposers.splice(index, 1);
    };

    $scope.addProposer = function() {
        $scope.openPersonSearchBoxAction(
            function(person) {
                $scope.idea.proposers.push(person);
            }
        );
    };
}])

.controller('IdeaSkillCtrl', ['$scope', function($scope) {
    $scope.addSkill = function() {
        $scope.showNewSkill = true;
        $scope.hideNewSkillButton = true;
        $scope.newSkillFocus = true;
    };

    $scope.removeSkill = function(index) {
        $scope.idea.skills.splice(index, 1);
    };

    $scope.saveSkill = function() {
        var newSkill = $scope.newSkill;
        if (newSkill !== null && !(/^\s*$/).test(newSkill)) {
            $scope.idea.skills.push(newSkill);
        }
        $scope.cancelSkill();
    };

    $scope.cancelSkill = function() {
        $scope.newSkill = "";
        $scope.showNewSkill = false;
        $scope.hideNewSkillButton = false;
        $scope.newSkillFocus = false;
    };
}])

.controller('IdeaTechCtrl', ['$scope', function($scope) {
    $scope.addTech = function() {
        $scope.showNewTech = true;
        $scope.hideNewTechButton = true;
        $scope.newTechFocus = true;
    };

    $scope.removeTech = function(index) {
        $scope.idea.technologies.splice(index, 1);
    };

    $scope.saveTech = function() {
        var newTech = $scope.newTech;
        if (newTech !== null && !(/^\s*$/).test(newTech)) {
            $scope.idea.technologies.push(newTech);
        }
        $scope.cancelTech();
    };

    $scope.cancelTech = function() {
        $scope.newTech = "";
        $scope.showNewTech = false;
        $scope.hideNewTechButton = false;
        $scope.newTechFocus = false;
    };
}])

.controller('IdeaTagCtrl', ['$scope', function($scope) {
    $scope.addTag = function() {
        $scope.showNewTag = true;
        $scope.hideNewTagButton = true;
        $scope.newTagFocus = true;
    };

    $scope.removeTag = function(index) {
        $scope.idea.tags.splice(index, 1);
    };

    $scope.saveTag = function() {
        var newTag = $scope.newTag;
        if (newTag !== null && !(/^\s*$/).test(newTag)) {
            $scope.idea.tags.push(newTag);
        }
        $scope.cancelTag();
    };

    $scope.cancelTag = function() {
        $scope.newTag = "";
        $scope.showNewTag = false;
        $scope.hideNewTagButton = false;
        $scope.newTagFocus = false;
    };
}])

.controller('IdeaNewCtrl', ['$scope', '$location', 'Util', 'Auth', 'IdeaSvc', 'Idea', 'skills', 'techs', 'tags', function($scope, $location, Util, Auth, IdeaSvc, Idea, skills, techs, tags) {
    $scope.showHeader();

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

    IdeaSvc.populateIdea($scope.idea, [ Auth.currentUser() ]);

    $scope.skills = skills;
    $scope.techs = techs;
    $scope.tags = tags;

    var sortFunc = function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    };
    skills.sort(sortFunc);
    techs.sort(sortFunc);
    tags.sort(sortFunc);

    $scope.save = function(form) {
        if (!form.$valid) {
            for (var prop in form) {
                if (form.hasOwnProperty(prop) && prop.indexOf('$', 0) === -1) {
                    form[prop].$touched = true;
                }
            }
            return;
        }

        IdeaSvc.stripIdea($scope.idea);

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
}]);