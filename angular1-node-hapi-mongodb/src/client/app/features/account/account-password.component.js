(function() {
    'use strict';

    /**
     * idAccountPassword
     *
     * This component renders the Change Password view.
     */
    angular
        .module('app.account')
        .component('idAccountPassword', accountPassword());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function accountPassword() {
        return {
            templateUrl: 'app/features/account/account-password.component.html',
            controller: AccountPasswordCtrl,
            controllerAs: 'vm'
        }
    }

    /**
     * Constructor function for the component's controller.
     * @constructor
     */
    AccountPasswordCtrl.$inject = ['$state', 'userService', 'authService'];
    function AccountPasswordCtrl($state, userService, authService) {
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
            vm.oldPasswordInvalid = false;
            vm.oldPassword = '';
            vm.newPassword = '';
            vm.confirmPassword = '';
        }

        /**
         * Saves the password.
         */
        function save(form) {
            var oldPass, newPass, confirm;

            if (!form.$valid) {
                return;
            }

            oldPass = CryptoJS.SHA3(vm.oldPassword).toString();
            newPass = CryptoJS.SHA3(vm.newPassword).toString();
            confirm = CryptoJS.SHA3(vm.confirmPassword).toString();
            if (vm.user.password !== oldPass) {
                vm.oldPasswordInvalid = true;
                return;
            }

            vm.user.password = newPass;
            userService.update(vm.user)
                .then(function() {
                    authService.currentUser(vm.user);
                    back();
                });
        };

        /**
         * Navigates to the account view.
         */
        function back() {
            $state.go('account');
        };
    }

})();
