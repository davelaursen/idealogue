(function() {
    'use strict';

    /**
     * exceptionHandler
     *
     * An extensible exception handling service, exceptionHandler is a drop-in replacement of
     * $exceptionHandler, or it can be used on its own. It provides additional exception handling
     * functionality, such as specifying an error message prefix.
     *
     * Configure the exceptionHandler service in your application's app or app.core module:
     *
     *   angular.module('app.core').config(function($provide, exceptionHandlerProvider) {
     *       // optionally replace the $exceptionHandler service
     *       $provide.provider('$exceptionHandler', exceptionHandlerProvider);
     *       exceptionHandlerProvider.errorPrefix('MyApp: ');
     *   });
     */
    angular
        .module('blocks.exception')
        .provider('exceptionHandler', ExceptionHandlerProvider);

    /**
     * Internal exception handler provider that is used to configure and retrieve the
     * exceptionHandler service.
     * @constructor
     */
    function ExceptionHandlerProvider() {
        var msgPrefix = '',
            noop = function() {},
            action = noop;

        /**
         * Sets the string to prepend to exception messages.
         * @param {string=} prefix the error message prefix to use
         * @returns {object|string} current value if used as getter or itself (chaining) if used as setter
         */
        this.errorPrefix = function(prefix) {
            if (angular.isDefined(prefix)) {
                msgPrefix = prefix || '';
                return this;
            } else {
                return msgPrefix;
            }
        };

        /**
         * Sets the custom function to execute whenever an exception is handled.
         * @param {function=} actionFn the custom function
         * @returns {object|function} current value if used as getter or itself (chaining) if used as setter
         */
        this.customAction = function(actionFn) {
            if (angular.isDefined(actionFn)) {
                action = actionFn;
                return this;
            } else {
                return action;
            }
        };

        /**
         * Gets the exceptionHandler service.
         * @param $log
         * @returns {object} the exceptionHandler service
         */
        this.$get = service;

        service.$inject = ['$log'];
        function service($log) {
            return handleException;

            /**
             * Handles the given exception.
             * @param {Error} exception the exception associated with the error
             * @param {string=} cause optional information about the context in which the
             *        error was thrown
             */
            function handleException(exception, cause) {
                exception.message = msgPrefix + exception.message;
                var errorData = { exception: exception, cause: cause };

                $log.error(exception, '\n', errorData);

                if (action) {
                    action(errorData);
                }
            }
        }
    }

})();
