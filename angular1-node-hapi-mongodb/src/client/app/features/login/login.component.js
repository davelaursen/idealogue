(function() {
    'use strict';

    angular
        .module('app.login')
        .component('idLogin', login());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function login() {
        return {
            templateUrl: 'app/features/login/login.component.html',
            controller: LoginCtrl,
            controllerAs: 'vm'
        }
    }

    /**
     * Constructor function for the component's controller.
     * @constructor
     */
    LoginCtrl.$inject = ['$state', 'authService'];
    function LoginCtrl($state, authService) {
        var vm = this;

        // lifecycle hooks
        vm.$onInit = onInit;

        // scope functions
        vm.login = login;
        vm.register = register;

        /////////////////////

        /**
         * Initializes the component.
         */
        function onInit() {
            vm.username = '';
            vm.password = '';
            vm.message = '';
        }

        /**
         * Logs a user into the system.
         */
        function login() {
            var password = CryptoJS.SHA3(vm.password).toString()
            authService.login(vm.username, password)
                .then(function(res) {
                    if (res.message) {
                        vm.message = res.message;
                    } else {
                        $state.go('ideas');
                    }
                })
                .catch(function(err) {
                    vm.message = 'An error occurred while logging in - please try again.';
                });
        }

        /**
         * Navigates to the signup view.
         */
        function register() {
            $state.go('signup');
        }
    }

})();
