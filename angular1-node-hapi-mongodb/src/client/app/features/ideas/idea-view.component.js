(function() {
    'use strict';

    angular
        .module('app.ideas')
        .component('idIdeaView', ideaView());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function ideaView() {
        return {
            templateUrl: 'app/features/ideas/idea-view.component.html',
            controller: IdeaViewCtrl,
            controllerAs: 'vm'
        }
    }

    /**
     * Constructor function for the component's controller.
     * @constructor
     */
    IdeaViewCtrl.$inject = [
        '$q', '$state', '$stateParams', 'util', 'authService', 'ideaService', 'userService'];
    function IdeaViewCtrl(
            $q, $state, $stateParams, util, authService, ideaService, userService) {
        var vm = this;

        // lifecycle hooks
        vm.$onInit = onInit;

        // scope functions
        vm.back = back;
        vm.edit = edit;
        vm.remove = remove;
        vm.vote = vote;
        vm.toList = toList;
        vm.addComment = addComment;
        vm.cancelComment = cancelComment;
        vm.saveComment = saveComment;

        /////////////////////

        /**
         * Initializes the component.
         */
        function onInit() {
            vm.showNewComment = false;
            vm.hideAddCommentButton = false;
            vm.newComment = null;

            $q.all([
                ideaService.getById($stateParams.id),
                userService.getAll()
            ]).then(function(data) {
                vm.idea = ideaService.convertForView(data[0], data[1]);
                vm.people = data[1];
            }).catch(function() {
                $state.go('404');
            });
        }

        /**
         * Navigates to the ideas view.
         */
        function back() {
            $state.go('ideas');
        }

        /**
         * Navigates to the edit idea view.
         */
        function edit() {
            $state.go('idea-edit', { id: vm.idea.id });
        }

        /**
         * Deletes the current idea from the system.
         */
        function remove() {
            ideaService.remove(vm.idea.id)
                .then(back);
        }

        /**
         * Adds a vote for the current idea from the current user. If the user has already
         * voted for the current idea, no action is taken.
         */
        function vote() {
            var id, found;

            id = authService.currentUser().id;
            found = _.find(vm.idea.votes, function(v) { return v === id; });
            if (!found) {
                vm.idea.votes.push(id);
                vm.idea.voteCount = parseInt(vm.idea.voteCount, 10) + 1;

                ideaService.update(ideaService.convertForSave(vm.idea));
            }
        }

        /**
         * Converts the given array to a string.
         * @param {object[]} arr  the array of object to convert
         * @param {string} prop  the name of the property to use as the string value
         */
        function toList(arr, prop) {
            return util.arrayToString(arr, prop);
        }

        /**
         * Displays the add comment input.
         */
        function addComment() {
            vm.showNewComment = true;
            vm.hideAddCommentButton = true;
        }

        /**
         * Cancels adding a comment toe the idea's comment array.
         */
        function cancelComment() {
            vm.newComment = null;
            vm.showNewComment = false;
            vm.hideAddCommentButton = false;
        }

        /**
         * Adds a comment to the idea's comment array.
         */
        function saveComment() {
            var user = authService.currentUser();

            vm.idea.comments.push({
                id: user.id,
                text: vm.newComment,
                timestamp: util.getISO8601DateString(),
                person: user
            });

            ideaService.update(ideaService.convertForSave(vm.idea))
                .then(function() {
                    cancelComment();
                });
        }
    }

})();
