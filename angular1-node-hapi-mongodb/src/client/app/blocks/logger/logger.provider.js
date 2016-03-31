(function() {
    'use strict';

    /**
     * logger
     *
     * An extensible logging service, logger is a drop-in replacement of $log, or it can be used on
     * its own. It provides additional logging functionality, such as specifying the logging level
     * and injecting custom logging behavior.
     *
     * Configure the logger service in your application's app or app.core module:
     *
     *   angular.module('app.core').config(function($provide, loggerProvider) {
     *       // optionally replace the $log service
     *       $provide.provider('$log', loggerProvider);
     *       loggerProvider.logLevel('info');
     *       loggerProvider.logToConsole(true);
     *       loggerProvider.customAction(function(level, args) {...});
     *   });
     */
    angular
        .module('blocks.logger')
        .provider('logger', LoggerProvider);

    /**
     * Internal logger provider that is used to configure and retrieve the logger service.
     * @constructor
     */
    function LoggerProvider() {
        var self = this,
            currentLevel = 1,
            consoleLogging = false,
            noop = function() {},
            action = noop;

        var logLevels = {
            debug: 4,
            info: 3,
            warn: 2,
            error: 1
        };

        /**
         * Enables debug-level logging.
         * @param {boolean=} flag enable or disable debug level messages
         * @returns {object|boolean} current value if used as getter or itself (chaining) if used as setter
         */
        this.debugEnabled = function(flag) {
            if (angular.isDefined(flag)) {
                currentLevel = 'debug';
                return this;
            } else {
                return currentLevel === 'debug';
            }
        };

        /**
         * Sets the level that logging should occur. Valid values, in priority order, are
         * 'error', 'warn', 'info' and 'debug'. Setting a log level will enable logging for
         * that level and all higher-priority levels. Defaults log level is 'error'.
         * @param {string=} level the log level
         * @returns {object|string} current value if used as getter or itself (chaining) if used as setter
         */
        this.logLevel = function(level) {
            if (angular.isDefined(level)) {
                currentLevel = logLevels[level || 'error'];
                return this;
            } else {
                return currentLevel;
            }
        };

        /**
         * Sets whether logging to a browser's console is enabled. By default it is disabled.
         * @param {boolean=} flag whether to log to console
         * @returns {object|boolean} current value if used as getter or itself (chaining) if used as setter
         */
        this.logToConsole = function(flag) {
            if (angular.isDefined(flag)) {
                consoleLogging = !!flag;
                return this;
            } else {
                return consoleLogging;
            }
        };

        /**
         * Sets the custom function to execute whenever a logging action is executed.
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
         * Gets the logger service.
         * @param $window
         * @returns {object} the logger service
         */
        this.$get = service;

        service.$inject = ['$window'];
        function service($window) {
            var service = {
                debug: debug,
                info: info,
                warn: warn,
                error: error,
                log: log
            };

            return service;

            /////////////////////
            // service methods

            /**
             * Write a debug message.
             */
            function debug() {
                if (currentLevel >= logLevels.debug) {
                    consoleLog('debug').apply(self, arguments);
                }
                takeAction('debug', [].slice.call(arguments));
            }

            /**
             * Write an information message.
             */
            function info() {
                if (currentLevel >= logLevels.info) {
                    consoleLog('info').apply(self, arguments);
                }
                takeAction('info', [].slice.call(arguments));
            }

            /**
             * Write a warning message.
             */
            function warn() {
                if (currentLevel >= logLevels.warn) {
                    consoleLog('warn').apply(self, arguments);
                }
                takeAction('warn', [].slice.call(arguments));
            }

            /**
             * Write an error message.
             * Note: error messages are always written (e.g. not controlled by log level).
             */
            function error() {
                consoleLog('error').apply(self, arguments);
                takeAction('error', [].slice.call(arguments));
            }

            /**
             * Write a log message.
             * Note: log messages are always written (e.g. not controlled by log level).
             */
            function log() {
                consoleLog('log').apply(self, arguments);
                takeAction('log', [].slice.call(arguments));
            }

            /////////////////////
            // helpers

            /**
             * Returns a function that is used to write logs to a console.
             * @param {string} type the type of message that needs to be logged
             * @returns {function} a function that can be used to log messages to a browser's
             *          console
             */
            function consoleLog(type) {
                if (!consoleLogging) {
                    return function() {};
                }

                var console = $window.console || {},
                    logFn = console[type] || console.log || noop,
                    hasApply = false;

                // Note: reading logFn.apply throws an error in IE11 in IE8 document mode.
                // The reason behind this is that console.log has type "object" in IE8...
                try {
                    hasApply = !!logFn.apply;
                } catch (e) {}

                if (hasApply) {
                    return function() {
                        var args = [];
                        angular.forEach(arguments, function(arg) {
                            args.push(formatError(arg));
                        });
                        return logFn.apply(console, args);
                    };
                }

                // we are IE which either doesn't have window.console => this is noop and we do nothing,
                // or we are IE where console.log doesn't have apply so we log at least first 2 args
                return function(arg1, arg2) {
                    logFn(arg1, arg2 == null ? '' : arg2);
                };
            }

            /**
             * Formats a logging argument.
             * @param {*} arg a logging argument
             * @returns {*} the formatted logging argument
             */
            function formatError(arg) {
                if (arg instanceof Error) {
                    if (arg.stack) {
                        arg = (arg.message && arg.stack.indexOf(arg.message) === -1) ?
                            'Error: ' + arg.message + '\n' + arg.stack :
                            arg.stack;
                    } else if (arg.sourceURL) {
                        arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
                    }
                }
                return arg;
            }

            /**
             * Executes the custom action if it was injected.
             * @param {string} level
             * @param {*[]} args
             */
            function takeAction(level, args) {
                if (action) {
                    action(level, args);
                }
            }
        };
    }

})();
