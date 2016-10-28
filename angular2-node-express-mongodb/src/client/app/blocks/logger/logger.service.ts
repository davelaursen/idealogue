import { Injectable, Inject, OpaqueToken } from '@angular/core';

export let LOGGER_CONFIG_TOKEN = new OpaqueToken('logger.config');

export interface ILoggerConfig {
    customAction?: ICustomActionFn;
    logLevel?: LogLevel;
    logToConsole?: boolean;
    console?: any
}

export enum LogLevel {
    Error = 1,
    Warn,
    Info,
    Debug
}

interface ICustomActionFn {
    (level: string, args: any[]): void;
}

@Injectable()
export class Logger {
    private _action: ICustomActionFn;
    private _consoleLogging: boolean;
    private _logLevel: LogLevel;
    private _console: any;

    constructor(@Inject(LOGGER_CONFIG_TOKEN) config: ILoggerConfig) {
        config = config || {};
        this._action = config.customAction;
        this._consoleLogging = !!config.logToConsole;
        this._logLevel = config.logLevel || LogLevel.Error;
        this._console = config.console || console;
    }

    /////////////////////
    // config methods

    /**
     * Sets the level that logging should occur. Valid values, in priority order, are
     * 'error', 'warn', 'info' and 'debug'. Setting a log level will enable logging for
     * that level and all higher-priority levels. Defaults log level is 'error'.
     * @param level - the log level
     * @returns the current value if used as getter or itself (chaining) if used as setter
     */
    logLevel(level?: LogLevel): LogLevel|Logger {
        if (level !== undefined && level !== null) {
            this._logLevel = level || LogLevel.Error;
            return this;
        } else {
            return this._logLevel;
        }
    }

    /**
     * Sets whether logging to a browser's console is enabled. By default it is disabled.
     * @param flag - whether to log to console
     * @returns the current value if used as getter or itself (chaining) if used as setter
     */
    logToConsole(flag?: boolean): boolean|Logger {
        if (flag !== undefined && flag !== null) {
            this._consoleLogging = !!flag;
            return this;
        } else {
            return this._consoleLogging;
        }
    }

    /**
     * Sets the custom function to execute whenever a logging action is executed.
     * @param actionFn - the custom function
     * @returns the current value if used as getter or itself (chaining) if used as setter
     */
    customAction(actionFn?: ICustomActionFn): ICustomActionFn|Logger {
        if (actionFn !== undefined && actionFn !== null) {
            this._action = actionFn;
            return this;
        } else {
            return this._action;
        }
    }

    /////////////////////
    // service methods

    /**
     * Write a debug message.
     */
    debug(...args: any[]) {
        if (this._logLevel >= LogLevel.Debug) {
            this._consoleLog('debug').apply(self, arguments);
        }
        this._takeAction('debug', [].slice.call(arguments));
    }

    /**
     * Write an information message.
     */
    info(...args: any[]) {
        if (this._logLevel >= LogLevel.Info) {
            this._consoleLog('info').apply(self, arguments);
        }
        this._takeAction('info', [].slice.call(arguments));
    }

    /**
     * Write a warning message.
     */
    warn(...args: any[]) {
        if (this._logLevel >= LogLevel.Warn) {
            this._consoleLog('warn').apply(self, arguments);
        }
        this._takeAction('warn', [].slice.call(arguments));
    }

    /**
     * Write an error message.
     * Note: error messages are always written (e.g. not controlled by log level).
     */
    error(...args: any[]) {
        this._consoleLog('error').apply(self, arguments);
        this._takeAction('error', [].slice.call(arguments));
    }

    /**
     * Write a log message.
     * Note: log messages are always written (e.g. not controlled by log level).
     */
    log(...args: any[]) {
        this._consoleLog('log').apply(self, arguments);
        this._takeAction('log', [].slice.call(arguments));
    }

    /////////////////////
    // helpers

    /**
     * Returns a function that is used to write logs to a console.
     * @param type - the type of message that needs to be logged
     * @returns a function that can be used to log messages to a browser's console
     */
    private _consoleLog(type: string): Function {
        if (!this._consoleLogging || !console) {
            return () => {};
        }

        let logFn = this._console[type] || this._console.log || function() {};
        let hasApply = false;

        // Note: reading logFn.apply throws an error in IE11 in IE8 document mode.
        // The reason behind this is that console.log has type "object" in IE8...
        try {
            hasApply = !!logFn.apply;
        } catch (e) {}

        if (hasApply) {
            let self = this;
            return function() {
                let args: any[] = [];
                for (let i = 0; i < arguments.length; i++) {
                    args.push(self._formatError(arguments[i]));
                }
                return logFn.apply(console, args);
            };
        }

        // we are IE which either doesn't have window.console => this is noop and we do nothing,
        // or we are IE where console.log doesn't have apply so we log at least first 2 args
        return (arg1: any, arg2: any) => {
            logFn(arg1, arg2 == null ? '' : arg2);
        };
    }

    /**
     * Formats a logging argument.
     * @param arg - a logging argument
     * @returns the formatted logging argument
     */
    private _formatError(arg: any): any {
        if (arg instanceof Error) {
            if (arg.stack) {
                arg = (arg.message && arg.stack.indexOf(arg.message) === -1) ?
                'Error: ' + arg.message + '\n' + arg.stack :
                    arg.stack;
            } else if ((<any>arg).sourceURL) {
                arg = arg.message + '\n' + (<any>arg).sourceURL + ':' + (<any>arg).line;
            }
        }
        return arg;
    }

    /**
     * Executes the custom action if it was injected.
     */
    private _takeAction(level: string, args: any[]) {
        if (this._action) {
            this._action(level, args);
        }
    }
}