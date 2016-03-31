(function() {
    'use strict';

    angular
        .module('app.ideas')
        .component('idIdeaList', ideaList());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function ideaList() {
        return {
            templateUrl: 'app/features/ideas/idea-list.component.html',
            controller: IdeaListCtrl,
            controllerAs: 'vm'
        }
    }

    /**
     * Constructor function for the component's controller.
     * @constructor
     */
    IdeaListCtrl.$inject = ['$state', 'util', 'ideaService'];
    function IdeaListCtrl($state, util, ideaService) {
        var vm = this;

        // lifecycle hooks
        vm.$onInit = onInit;

        // scope functions
        vm.toList = toList;
        vm.addNew = addNew;
        vm.viewIdea = viewIdea;
        vm.reverseSortOrder = reverseSortOrder;
        vm.toggleFilter = toggleFilter;

        /////////////////////

        /**
         * Initializes the component.
         */
        function onInit() {
            vm.ideas = [];
            vm.desc = false;
            vm.filterStr = '';
            vm.showFilter = false;

            ideaService.getAll()
                .then(function(ideas) {
                    if (ideas && ideas.length > 0) {
                        ideas.sort(util.sortCompareFunc('name', false, function(a){return a.toUpperCase()}));
                        vm.ideas = ideas;
                    }
                });
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
         * Navigates to the Add New Idea view.
         */
        function addNew() {
            $state.go('idea-new');
        }

        /**
         * Navigates to the detail view for the specified idea.
         * @param {string} id  the id of the idea to view
         */
        function viewIdea(id) {
            $state.go('idea-view', {id: id});
        }

        /**
         * Reverses the sort order for the idea list.
         */
        function reverseSortOrder() {
            vm.desc = !vm.desc;
            vm.ideas.sort(util.sortCompareFunc('name', vm.desc, function(a){return a.toUpperCase()}));
        }

        /**
         * Toggles displaying the filter field for the ideas list.
         */
        function toggleFilter() {
            vm.showFilter = !vm.showFilter;
        }
    }

})();
