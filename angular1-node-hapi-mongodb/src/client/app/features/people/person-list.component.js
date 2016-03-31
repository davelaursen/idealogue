(function() {
    'use strict';

    angular
        .module('app.people')
        .component('idPersonList', personList());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function personList() {
        return {
            templateUrl: 'app/features/people/person-list.component.html',
            controller: PersonListCtrl,
            controllerAs: 'vm'
        }
    }

    /**
     * Constructor function for the component's controller.
     * @constructor
     */
    PersonListCtrl.$inject = ['$state', 'util', 'userService'];
    function PersonListCtrl($state, util, userService) {
        var vm = this;

        // lifecycle hooks
        vm.$onInit = onInit;

        // scope functions
        vm.viewPerson = viewPerson;
        vm.reverseSortOrder = reverseSortOrder;
        vm.toggleFilter = toggleFilter;

        /////////////////////

        /**
         * Initializes the component.
         */
        function onInit() {
            vm.people = [];
            vm.desc = false;
            vm.filterStr = '';
            vm.showFilter = false;

            userService.getAll()
                .then(function(users) {
                    if (users && users.length > 0) {
                        users.sort(util.sortCompareFunc('lastName', false, function(a){return a.toUpperCase()}));
                        vm.people = users;
                    }
                });
        }

        /**
         * Navigates to the detail view for the specified person.
         * @param {string} id  the id of the person to view
         */
        function viewPerson(id) {
            $state.go('person-view', {id: id});
        }

        /**
         * Reverses the sort order for the people list.
         */
        function reverseSortOrder() {
            vm.desc = !vm.desc;
            vm.people.sort(util.sortCompareFunc('lastName', vm.desc, function(a){return a.toUpperCase()}));
        }

        /**
         * Toggles displaying the filter field for the people list.
         */
        function toggleFilter() {
            vm.showFilter = !vm.showFilter;
        }
    }

})();
