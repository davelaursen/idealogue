(function() {
    'use strict';

    /**
     * account routes
     *
     * Configures the Account routing functionality.
     */
    angular
        .module('app.account')
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
                state: 'account',
                config: {
                    url: '/account',
                    template: '<id-account-view></id-account-view>',
                    title: 'Account',
                    data: {
                        requiresLogin: true
                    }
                }
            },
            {
                state: 'account-edit',
                config: {
                    url: '/account/edit',
                    template: '<id-account-edit></id-account-edit>',
                    title: 'Edit Account',
                    data: {
                        requiresLogin: true
                    }
                }
            },
            {
                state: 'account-password',
                config: {
                    url: '/account/password',
                    template: '<id-account-password></id-account-password>',
                    title: 'Change Password',
                    data: {
                        requiresLogin: true
                    }
                }
            }
        ];
    }
})();
