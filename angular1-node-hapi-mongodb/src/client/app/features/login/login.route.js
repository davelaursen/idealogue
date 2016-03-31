(function() {
    'use strict';

    /**
     * login routes
     *
     * Configures the Login routing functionality.
     */
    angular
        .module('app.login')
        .run(configureRoutes);

    /**
     * Internal function that is used to configure the routes.
     */
    configureRoutes.$inject = ['uiRouterHelper'];
    function configureRoutes(uiRouterHelper) {
        uiRouterHelper.configureStates(getStates());
    }

    /**
     * Returns an array of routing states.
     * @returns {object[]}
     */
    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    template: '<id-login></id-login>',
                    title: 'Login'
                }
            },
            {
                state: 'signup',
                config: {
                    url: '/signup',
                    template: '<id-signup></id-signup>',
                    title: 'Signup'
                }
            }
        ];
    }
})();
