(function() {
    'use strict';

    angular
        .module('app.people')
        .component('idPersonView', personView());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function personView() {
        return {
            templateUrl: 'app/features/people/person-view.component.html',
            controller: PersonViewCtrl,
            controllerAs: 'vm'
        }
    }

    /**
     * Constructor function for the component's controller.
     * @constructor
     */
    PersonViewCtrl.$inject = ['$state', '$stateParams', 'userService'];
    function PersonViewCtrl($state, $stateParams, userService) {
        var vm = this;

        // lifecycle hooks
        vm.$onInit = onInit;

        // scope functions
        vm.back = back;

        /////////////////////

        /**
         * Initializes the component.
         */
        function onInit() {
            userService.getById($stateParams.id)
                .then(function(person) {
                    vm.person = person;
                });
        }

        /**
         * Navifate to the people view.
         */
        function back() {
            $state.go('people');
        }
    }

})();
