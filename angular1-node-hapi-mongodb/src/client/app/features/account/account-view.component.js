(function() {
    'use strict';

    /**
     * idAccountView
     *
     * This component renders the Account Details view.
     */
    angular
        .module('app.account')
        .component('idAccountView', accountView());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function accountView() {
        return {
            templateUrl: 'app/features/account/account-view.component.html',
            controller: AccountViewCtrl,
            controllerAs: 'vm'
        }
    }

    /**
     * Constructor function for the component's controller.
     * @constructor
     */
    AccountViewCtrl.$inject = ['$state', 'userService', 'authService'];
    function AccountViewCtrl($state, userService, authService) {
        var vm = this;

        // lifecycle hooks
        vm.$onInit = onInit;

        // scope functions
        vm.edit = edit;
        vm.changePassword = changePassword;
        vm.remove = remove;

        /////////////////////

        /**
         * Initializes the component.
         */
        function onInit() {
            vm.user = authService.currentUser();
        }

        /**
         * Navigates to the edit account view.
         */
        function edit() {
            $state.go('account-edit');
        }

        /**
         * Navigates to the change password view.
         */
        function changePassword() {
            $state.go('account-password');
        }

        /**
         * Deletes the current user's account.
         */
        function remove() {
            userService.remove(vm.user.id)
                .then(function() {
                    authService.logout();
                });
        }
    }

})();
