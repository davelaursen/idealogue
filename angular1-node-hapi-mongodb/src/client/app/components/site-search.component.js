(function() {
    'use strict';

    /**
     * idSiteSearch
     *
     * This component renders the site search lightbox.
     */
    angular
        .module('app.components')
        .component('idSiteSearch', siteSearch());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function siteSearch() {
        return {
            templateUrl: 'app/components/site-search.component.html',
            bindings: {
                searchStr: '<',
                showLightbox: '=',
                onSelect: '&',
                onClose: '&'
            },
            controller: SiteSearchCtrl,
            controllerAs: 'vm'
        };
    }

    /**
     * Constructor function for the component's controller.
     * @constructor
     */
    SiteSearchCtrl.$inject = ['$q', '$state', 'util', 'ideaService', 'userService'];
    function SiteSearchCtrl($q, $state, util, ideaService, userService) {
        var vm = this;

        // lifecycle hooks
        vm.$onInit = onInit;

        // scope functions
        vm.executeSearch = executeSearch;
        vm.closeSearch = closeSearch;
        vm.selectIdea = selectIdea;
        vm.selectPerson = selectPerson;

        /////////////////////

        /**
         * Initializes the component.
         */
        function onInit() {
            vm.ideaResults = [];
            vm.peopleResults = [];
            executeSearch();
        }

        /**
         * Executes a site search.
         */
        function executeSearch() {
            if (util.isEmpty(vm.searchStr)) {
                vm.ideaResults = [];
                vm.peopleResults = [];
            } else {
                $q.all([
                    ideaService.search(vm.searchStr),
                    userService.search(vm.searchStr)
                ]).then(function(data) {
                    vm.ideaResults = data[0];
                    vm.peopleResults = data[1];
                });
            }
        }

        /**
         * Closes the search lightbox.
         */
        function closeSearch() {
            vm.showLightbox = false;
            vm.onClose();
        }

        /**
         * Selects an idea from the search results and navigates to the idea details view.
         * @param {object} idea  the selected idea
         */
        function selectIdea(idea) {
            vm.onSelect();
            $state.go('idea-view', {id: idea.id});
        }

        /**
         * Selects a person from the search results and navigates to the person details view.
         * @param {object} person  the selected person
         */
        function selectPerson(person) {
            vm.onSelect();
            $state.go('person-view', {id: person.id});
        }
    }

})();
