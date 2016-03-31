(function() {
    'use strict';

    /**
     * idPersonSearch
     *
     * This component renders the person search lightbox.
     */
    angular
        .module('app.components')
        .component('idPersonSearch', personSearch());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function personSearch() {
        return {
            templateUrl: 'app/components/person-search.component.html',
            bindings: {
                people: '=',
                showLightbox: '=',
                onSelect: '&'
            },
            controller: PersonSearchCtrl,
            controllerAs: 'vm'
        };
    }

    /**
     * Constructor function for the component's controller.
     * @constructor
     */
    PersonSearchCtrl.$inject = ['$scope', 'util', 'userService'];
    function PersonSearchCtrl($scope, util, userService) {
        var vm = this;

        // lifecycle hooks
        vm.$onInit = onInit;

        // scope functions
        vm.executeSearch = executeSearch;
        vm.closeSearch = closeSearch;
        vm.selectPerson = selectPerson;

        /////////////////////

        /**
         * Initializes the component.
         */
        function onInit() {
            vm.searchStr = "";
            vm.searchResults = [];
        }

        /**
         * Executes a person search.
         */
        function executeSearch() {
            var results = _findPeople();
            results.sort(util.sortCompareFunc('id', false, function(a){return a.toUpperCase()}));
            vm.searchResults = results;
        }

        /**
         * Closes the search lightbox.
         */
        function closeSearch() {
            vm.showLightbox = false;
            vm.searchStr = "";
            vm.searchResults = [];
        }

        /**
         * Selects a person from the search results and closes the search lightbox.
         * @param {object} person  the selected person
         */
        function selectPerson(person) {
            if (vm.onSelect) {
                vm.onSelect({person: person});
            }
            closeSearch();
        }

        /////////////////////

        /**
         * Finds people that match the current search value.
         * @return {Array} an array of person objects
         */
        function _findPeople() {
            if (util.isEmpty(vm.searchStr)) {
                return mv.people;
            }

            return _.filter(
                vm.people,
                function(p) {
                    return p.firstName.toLowerCase().indexOf(vm.searchStr) > -1 ||
                        p.lastName.toLowerCase().indexOf(vm.searchStr) > -1 ||
                        p.username.toLowerCase().indexOf(vm.searchStr) > -1 ||
                        p.email.toLowerCase().indexOf(vm.searchStr) > -1;
                }
            );
        }
    }

})();
