var directives = angular.module('idealogue.ideaDirectives', ['idealogue.configServices','idealogue.utilityServices','idealogue.ideaServices']);

directives.directive("idealist", function(ConfigSvc, UtilSvc, IdeaSvc) {
    return {
        restrict: "E",
        templateUrl: "/views/ideaList.html",
        link: function(scope, element) {
            UtilSvc.setMouseOverNavTipEffect(element.find('img.action'), $('#ideaListActionTip'));

            scope.reload = function() {
                IdeaSvc.loadIdeas();
            };

            scope.addNew = function() {
                IdeaSvc.newIdea();
                UtilSvc.scrollToView('ideaAdd');
            };
        }
    }
});

directives.directive("nav", function(UtilSvc, IdeaSvc) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
            var nav = attrs.nav.split(',');
            UtilSvc.scrollToView(nav[1]);
            IdeaSvc.loadIdea(nav[0]);
            return false;
        });
    };
});

directives.directive("ideaview", function($q, ConfigSvc, UtilSvc, Idea, IdeaSvc) {
    return {
        restrict: "E",
        templateUrl: "/views/ideaView.html",
        link: function(scope, element) {
            $('#newComment').autoSize();
            $('#summary').autoSize();
            $('#benefits').autoSize();
            $('#details').autoSize();

            var actionImages = element.find('img.action');
            UtilSvc.setMouseOverNavTipEffect(actionImages, $('#ideaViewActionTip'));
            UtilSvc.setMouseOverNavTipEffect(actionImages, $('#ideaEditActionTip'));


            scope.addComment = function() {
                $('#newCommentLine').show();
                $('#addCommentButton').hide();
            };

            scope.cancelComment = function() {
                scope.newComment = null;
                $('#newCommentLine').hide();
                $('#addCommentButton').show();
            }

            scope.saveComment = function() {
                var newComment = scope.newComment;

                var comments = scope.idea.comments;
                comments[comments.length] = {
                    timestamp: scope.getISO8601DateString(),
                    fullName: 'Dave Laursen',
                    text: newComment
                };
                Idea.save(scope.idea, scope.cancel);

                scope.newComment = null;
                $('#newCommentLine').hide();
                $('#addCommentButton').show();
            };

            scope.printDate = function(dateStr) {
                var date = new Date();
                date.setUTCFullYear(dateStr.substring(0,4));
                date.setUTCMonth(dateStr.substring(5,7));
                date.setUTCDate(dateStr.substring(8,10));
                date.setUTCHours(dateStr.substring(11,13));
                date.setUTCMinutes(dateStr.substring(14,16));
                date.setUTCSeconds(dateStr.substring(17,19));
                date.setUTCMilliseconds('000');
                return date.toLocaleString();
            }

            scope.getISO8601DateString = function() {
                var convert = function(x) { return x.length === 1 ? "0"+x : x; }
                var dateObj = new Date();
                var year = dateObj.getUTCFullYear().toString();
                var month = convert(dateObj.getUTCMonth().toString());
                var date = convert(dateObj.getUTCDate().toString());
                var hours = convert(dateObj.getUTCHours().toString());
                var minutes = convert(dateObj.getUTCMinutes().toString());
                var seconds = convert(dateObj.getUTCSeconds().toString());
                var str = year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + ".000Z";
                console.log("new date: " + str);
                return str;
            };

            scope.save = function() {
                UtilSvc.transformIdeaForSave(scope.idea);

                // validate data
                if (!IdeaSvc.validateIdeaForm(scope)) {
                    return;
                }

                // save data
                var deferred = $q.defer();
                Idea.save(scope.idea, function(response) {
                    deferred.resolve(response.data);
                });
                deferred.promise.then(function(idea) {
                    if (idea) {
                        scope.idea = idea;
                    }
                    IdeaSvc.loadIdea(scope.idea.id);
                });
            };

            scope.deleteIdea = function() {
                Idea.remove(scope.idea.id, scope.goToIdeas);
            };

            scope.goToIdeas = function() {
                IdeaSvc.loadIdeas();
                UtilSvc.scrollToView('ideaList');
            };

            scope.vote = function() {
                var idea = scope.idea;
                var votes = idea.votes;
                var id = "1234567890";

                if ($.inArray(id, votes) === -1) {
                    votes[votes.length] = "1234567890";
                    idea.voteCount = parseInt(idea.voteCount)+1;
                    Idea.save(idea, scope.cancel);
                }
            };

            scope.cancel = function() {
                // when editing an idea
                if (scope.idea.id) {
                    IdeaSvc.loadIdea(scope.idea.id);
                }
                // when creating a new idea
                else {
                    scope.goToIdeas();
                }
            };
            scope.edit = function() {
                IdeaSvc.editIdea(scope.idea.id);
            };

            scope.toList = function(arr, prop) {
                return UtilSvc.arrayToString(arr, prop);
            };

            scope.addSkill = function() {
                var skills = scope.idea.skills;
                skills[skills.length] = {value: ""};
            };
            scope.removeSkill = function(index) {
                scope.idea.skills.splice(index, 1);
            };

            scope.addTechnology = function() {
                var technologies = scope.idea.technologies;
                technologies[technologies.length] = {value: ""};
            };
            scope.removeTechnology = function(index) {
                scope.idea.technologies.splice(index, 1);
            };

            scope.addTag = function() {
                var tags = scope.idea.tags;
                tags[tags.length] = {value: ""};
            };
            scope.removeTag = function(index) {
                scope.idea.tags.splice(index, 1);
            };
        }
    }
});