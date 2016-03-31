(function() {
    'use strict';

    /**
     * core.route
     *
     * Configures the application's core routing functionality.
     */
    angular
        .module('app.core')
        .run(configureRoutes);

    /**
     * Internal function that is used to configure the application's router.
     */
    configureRoutes.$inject = ['$state', '$rootScope', 'uiRouterHelper', 'authService'];
    function configureRoutes($state, $rootScope, uiRouterHelper, authService) {
        var otherwise = '/404';
        uiRouterHelper.configureStates(getStates(), otherwise);

        $rootScope.$on('$stateChangeStart', function(e, toState) {
            var stateData = toState.data;
            if (stateData && stateData.requiresLogin && !authService.isLoggedIn()) {
                e.preventDefault();
                $state.go('login');
            }
        });
    }

    /**
     * Returns an array of core state objects.
     * @returns {object[]}
     */
    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/core/404.html',
                    title: '404'
                }
            },
            {
                state: '401',
                config: {
                    url: '/401',
                    templateUrl: 'app/core/401.html',
                    title: '401'
                }
            }
        ];
    }

})();
