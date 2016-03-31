(function() {
    'use strict';

    angular
        .module('app.login')
        .component('idSignup', signup());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function signup() {
        return {
            templateUrl: 'app/features/login/signup.component.html',
            controller: SignupCtrl,
            controllerAs: 'vm'
        }
    }

    /**
     * Constructor function for the component's controller.
     * @constructor
     */
    SignupCtrl.$inject = ['$state', 'util', 'authService', 'userService'];
    function SignupCtrl($state, util, authService, userService) {
        var vm = this;

        // lifecycle hooks
        vm.$onInit = onInit;

        // scope functions
        vm.save = save;
        vm.cancel = cancel;

        /////////////////////

        /**
         * Initializes the component.
         */
        function onInit() {
            vm.user = userService.newUser();
            vm.newPassword = '';
            vm.confirmPassword = '';
        }

        /**
         * Registers a new user in the system.
         * @param {Form} form  the form containing the user data to register
         */
        function save(form) {
            var prop;

            if (!form.$valid) {
                for (prop in form) {
                    if (form.hasOwnProperty(prop) && prop.indexOf('$', 0) === -1) {
                        form[prop].$touched = true;
                    }
                }
                return;
            }

            vm.user.password = CryptoJS.SHA3(vm.newPassword).toString();
            vm.user.createdDate = util.getISO8601DateString();
            vm.user.updatedDate = vm.user.createdDate;

            authService.signup(vm.user)
                .then(function() {
                    authService.login(vm.user.username, vm.user.password)
                        .then(function(res) {
                            if (res.message) {
                                alert(res.message);
                            } else {
                                $state.go('ideas');
                            }
                        });
                })
                .catch(function(err) {
                    alert(err.result.data.message);
                });
        }

        /**
         * Navigates to the login view.
         */
        function cancel() {
            $state.go('login');
        }
    }

})();
