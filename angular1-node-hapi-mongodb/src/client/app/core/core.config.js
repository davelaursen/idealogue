(function() {
    'use strict';

    /**
     * core.config
     *
     * Configures the app.core module.
     */
    angular
        .module('app.core')
        .config(configure);

    /**
     * Internal function that is used to configure the app.core module.
     */
    configure.$inject = [
        '$provide', '$httpProvider', 'config', 'uiRouterHelperProvider',
        'exceptionHandlerProvider', 'loggerProvider'];
    function configure(
            $provide, $httpProvider, config, uiRouterHelperProvider,
            exceptionHandlerProvider, loggerProvider) {

        configureExceptionHandler();
        configureLogger();
        configureRouterHelper();
        configureHttp();

        ////////////////

        /**
         * Configures the Exception Handler application block.
         */
        function configureExceptionHandler() {
            $provide.provider('$exceptionHandler', exceptionHandlerProvider); //replace $exceptionHandler service
            exceptionHandlerProvider.errorPrefix(config.appErrorPrefix);
        }

        /**
         * Configures the Logger application block.
         */
        function configureLogger() {
            $provide.provider('$log', loggerProvider); //replace $log service

            loggerProvider.logLevel(config.consoleLogLevel);
            loggerProvider.logToConsole(config.logToConsole);
        }

        /**
         * Configures the Router Helper application block.
         */
        function configureRouterHelper() {
            uiRouterHelperProvider.titlePrefix('Idealogue:');
        }

        /**
         * Configures the $http service.
         */
        function configureHttp() {
            $httpProvider.interceptors.push(['$location',
                function($location) {
                    return {
                        responseError: function(conf) {
                            if (conf.status === 401) {
                                $location.path('/login');
                            }
                            return conf;
                        }
                    };
                }
            ]);
        }
    }
})();
