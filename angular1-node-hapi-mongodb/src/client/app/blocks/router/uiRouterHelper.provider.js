(function() {
    'use strict';

    /**
     * routerHelper
     *
     * routerHelper is an utility service that useful functionality when working with UI-Router.
     *
     * Configure the routerHelper service in your application's app or app.core module:
     *
     *   angular.module('app.core').config(function(routerHelperProvider) {
     *       routerHelperProvider.docTitle('MyApp:');
     *       routerHelperProvider.addResolve('name', nameResolutionFunc);
     *   });
     */
    angular
        .module('blocks.router')
        .provider('uiRouterHelper', UIRouterHelperProvider);

    /**
     * Internal router helper provider that is used to configure and retrieve the routerHelper service.
     * @constructor
     */
    function UIRouterHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        var docTitlePrefix,
            resolveAlways = {};

        $locationProvider.html5Mode(true);

        /**
         * Sets the document title prefix for all routes.
         * @param {string=} prefix
         * @returns {object|string} current value if used as getter or itself (chaining) if used as setter
         */
        this.titlePrefix = function(prefix) {
            if (angular.isDefined(prefix)) {
                docTitlePrefix = prefix;
                return this;
            } else {
                return docTitlePrefix;
            }
        };

        /**
         * Adds a parameter to resolve for all routes.
         * @param {string=} name the name of the parameter to resolve
         * @param {function=} func a function that returns a Promise that will resolve the parameter
         * @returns {object|string} current value if used as getter or itself (chaining) if used as setter
         */
        this.resolve = function(name, func) {
            if (angular.isDefined(name)) {
                resolveAlways[name] = func;
                return this;
            } else {
                return resolveAlways;
            }
        };

        /**
         * Enables HTML 5 mode.
         * @param {(boolean|object)=} mode
         * @returns {object} current html5mode object if used as getter or itself (chaining) if used as setter
         */
        this.html5Mode = function(mode) {
            if (angular.isDefined(mode)) {
                $locationProvider.html5Mode(mode);
                return this;
            } else {
                return $locationProvider.html5Mode();
            }
        };

        /**
         * Gets the routerHelper service.
         * @param {object} $rootScope
         * @returns {object} the routerHelper service
         */
        this.$get = service;

        service.$inject = ['$rootScope'];
        function service($rootScope) {
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                stateCounts: stateCounts,
                configureStates: configureStates
            };

            init();

            return service;

            ///////////////

            /**
             * Initializes the service.
             */
            function init() {
                $rootScope.$on('$stateChangeError', function() {
                    stateCounts.errors++;
                });

                $rootScope.$on('$stateChangeSuccess', function(event, toState) {
                    stateCounts.changes++;
                    $rootScope.title = docTitlePrefix + ' ' + (toState.title || '');
                });
            }

            /**
             * Configures the specified states.
             * @param {object[]} states
             * @param {string=} otherwisePath
             */
            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    state.config.resolve = angular.extend(
                        state.config.resolve || {},
                        resolveAlways
                    );
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }
        };
    }

})();
