(function() {
    'use strict';

    /**
     * idAccountEdit
     *
     * This component renders the Edit Account view.
     */
    angular
        .module('app.account')
        .component('idAccountEdit', accountEdit());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function accountEdit() {
        return {
            templateUrl: 'app/features/account/account-edit.component.html',
            controller: AccountEditCtrl,
            controllerAs: 'vm'
        }
    }

    /**
     * Constructor function for the component's controller.
     * @constructor
     */
    AccountEditCtrl.$inject = ['$state', 'util', 'userService', 'authService'];
    function AccountEditCtrl($state, util, userService, authService) {
        var vm = this;

        // lifecycle hooks
        vm.$onInit = onInit;

        // scope functions
        vm.save = save;
        vm.back = back;

        /////////////////////

        /**
         * Initializes the component.
         */
        function onInit() {
            vm.user = authService.currentUser();
        }

        /**
         * Saves the account.
         * @param {Form} form  the form containing the account data to save
         */
        function save(form) {
            if (!form.$valid) {
                return;
            }

            vm.user.updatedDate = util.getISO8601DateString();
            userService.update(vm.user)
                .then(function() {
                    authService.currentUser(vm.user);
                    back();
                });
        }

        /**
         * Navigates to the account view.
         */
        function back() {
            $state.go('account');
        }
    }

})();
