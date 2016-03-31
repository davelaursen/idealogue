(function() {
    'use strict';

    /**
     * idHeader
     *
     * This component renders the application header.
     */
    angular
        .module('app.components')
        .component('idHeader', header());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function header() {
        return {
            templateUrl: 'app/components/header.component.html',
            controller: HeaderCtrl,
            controllerAs: 'vm'
        };
    }

    /**
     * Constructor function for the component's controller.
     * @constructor
     */
    HeaderCtrl.$inject = ['$state', 'eventingService', 'authService'];
    function HeaderCtrl($state, eventingService, authService) {
        var vm = this;

        // lifecycle hooks
        vm.$onInit = onInit;

        // scope functions
        vm.executeSearch = executeSearch;
        vm.goToIdeas = goToIdeas;
        vm.goToPeople = goToPeople;
        vm.goToAccount = goToAccount;
        vm.logout = logout;
        vm.clearSearchValue = clearSearchValue;

        /////////////////////

        /**
         * Initializes the component.
         */
        function onInit() {
            var currentUser = authService.currentUser();
            if (currentUser) {
                vm.currentUserName = currentUser.firstName + ' ' + currentUser.lastName;
            }

            vm.headerVisible = true;
            vm.searchValue = '';
            vm.searchResultsVisible = false;

            eventingService.registerListener('accountChange', 'header', function(user) {
                vm.currentUserName = !user ? '' : user.firstName + ' ' + user.lastName;
            });
        }

        /**
         * Executes a search.
         */
        function executeSearch() {
            vm.searchResultsVisible = true;
        }

        /**
         * Navigates to the Ideas view.
         */
        function goToIdeas() {
            $state.go('ideas');
        }

        /**
         * Navigates to the People view.
         */
        function goToPeople() {
            $state.go('people');
        }

        /**
         * Navigates to the Account view.
         */
        function goToAccount() {
            $state.go('account');
        }

        /**
         * Logs the current user out of the application.
         */
        function logout() {
            authService.logout()
                .then(function() {
                    $state.go('login');
                });
        }

        /**
         * Clears the search text field.
         */
        function clearSearchValue() {
            vm.searchValue = '';
        }
    }

})();
