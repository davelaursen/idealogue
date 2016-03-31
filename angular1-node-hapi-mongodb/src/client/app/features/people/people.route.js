(function() {
    'use strict';

    /**
     * people routes
     *
     * Configures the People routing functionality.
     */
    angular
        .module('app.people')
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
                state: 'people',
                config: {
                    url: '/people',
                    template: '<id-person-list></id-person-list>',
                    title: 'People',
                    data: {
                        requiresLogin: true
                    }
                }
            },
            {
                state: 'person-view',
                config: {
                    url: '/people/:id',
                    template: '<id-person-view></id-person-view>',
                    title: 'Person',
                    data: {
                        requiresLogin: true
                    }
                }
            }
        ];
    }
})();
