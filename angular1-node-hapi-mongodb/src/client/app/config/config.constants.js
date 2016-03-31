/* global moment:false */
(function() {
    'use strict';

    /**
     * config constants
     *
     * Defines the following constants for use throughout the application:
     * - config: the application configuration object
     */
    angular
        .module('app.config')
        .constant('config', {
            apiBaseUrl: '/api',

            // exception handler settings
            appErrorPrefix: '[Idealogue] ',

            // logger settings
            logToConsole: true,
            consoleLogLevel: 'info'
        });
})();
