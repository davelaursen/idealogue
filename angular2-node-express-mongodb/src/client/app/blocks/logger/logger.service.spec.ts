import { Logger, LogLevel } from './logger.service';

describe('Logger', () => {
    let logger: Logger;
    let testConsole: any;

    beforeEach(() => {
        testConsole = {
            log: jasmine.createSpy('log')
        };
        logger = new Logger({
            logToConsole: true,
            console: testConsole
        });
    });

    it('should exist', () => {
        expect(logger).toBeDefined();
    });

    describe('logLevel()', () => {
        it('should properly get/set the log level', () => {
            expect(logger.logLevel()).toEqual(LogLevel.Error);

            logger.logLevel(LogLevel.Info);
            expect(logger.logLevel()).toEqual(LogLevel.Info);
        });
    });

    describe('logToConsole()', () => {
        it('should properly get/set the log-to-console flag', () => {
            expect(logger.logToConsole()).toEqual(true);

            logger.logToConsole(false);
            expect(logger.logToConsole()).toEqual(false);

            logger.logToConsole(true);
            expect(logger.logToConsole()).toEqual(true);
        });
    });

    describe('customAction()', () => {
        it('should properly get/set the custom action', () => {
            var f = (level: string, args: any[]) => { };

            //no way to test that it's a noop function, so we'll just check to see that a default function exists
            expect(typeof logger.customAction).toEqual('function');

            logger.customAction(f);
            expect(logger.customAction()).toEqual(f);
        });
    });

    describe('debug()', () => {
        it('should log the debug info passed to it if the log level is set to debug', () => {
            logger.logLevel(LogLevel.Debug);
            logger.debug('test');
            expect(testConsole.log).toHaveBeenCalledWith('test');
        });

        it('should not log the debug info passed to it if the log level is set above debug', () => {
            logger.logLevel(LogLevel.Info);
            logger.debug('test');
            expect(testConsole.log).not.toHaveBeenCalled();
        });

        it('should not log to the console if the logToConsole flag is set to false', () => {
            logger.logLevel(LogLevel.Debug);
            logger.logToConsole(false);
            logger.debug('test');
            expect(testConsole.log).not.toHaveBeenCalled();
        });

        it('should call the customAction function if set', () => {
            var customAction = jasmine.createSpy('customAction');

            logger.logLevel(LogLevel.Debug);
            logger.customAction(customAction);
            logger.debug('test');
            expect(customAction).toHaveBeenCalledWith('debug', ['test']);
        });
    });

    describe('info()', () => {
        it('should log the info passed to it if the log level is set to info or below', () => {
            logger.logLevel(LogLevel.Debug);
            logger.info('test');
            expect(testConsole.log).toHaveBeenCalledWith('test');

            logger.logLevel(LogLevel.Info);
            logger.info('test');
            expect(testConsole.log).toHaveBeenCalledWith('test');
        });

        it('should not log the info passed to it if the log level is set above info', () => {
            logger.logLevel(LogLevel.Warn);
            logger.info('test');
            expect(testConsole.log).not.toHaveBeenCalled();
        });

        it('should not log to the console if the logToConsole flag is set to false in the provider', () => {
            logger.logLevel(LogLevel.Debug);
            logger.logToConsole(false);
            logger.info('test');
            expect(testConsole.log).not.toHaveBeenCalled();
        });

        it('should call the customAction function set in the provider', () => {
            var customAction = jasmine.createSpy('customAction');

            logger.logLevel(LogLevel.Debug);
            logger.customAction(customAction);
            logger.info('test');
            expect(customAction).toHaveBeenCalledWith('info', ['test']);
        });
    });

    describe('warn()', () => {
        it('should log the warn info passed to it if the log level is set to warn or below', () => {
            logger.logLevel(LogLevel.Info);
            logger.warn('test');
            expect(testConsole.log).toHaveBeenCalledWith('test');

            logger.logLevel(LogLevel.Warn);
            logger.warn('test');
            expect(testConsole.log).toHaveBeenCalledWith('test');
        });

        it('should not log the warn info passed to it if the log level is set above warn', () => {
            logger.logLevel(LogLevel.Error);
            logger.info('test');
            expect(testConsole.log).not.toHaveBeenCalled();
        });

        it('should not log to the console if the logToConsole flag is set to false in the provider', () => {
            logger.logLevel(LogLevel.Debug);
            logger.logToConsole(false);
            logger.warn('test');
            expect(testConsole.log).not.toHaveBeenCalled();
        });

        it('should call the customAction function set in the provider', () => {
            var customAction = jasmine.createSpy('customAction');

            logger.logLevel(LogLevel.Debug);
            logger.customAction(customAction);
            logger.warn('test');
            expect(customAction).toHaveBeenCalledWith('warn', ['test']);
        });
    });

    describe('error()', () => {
        it('should log the error info passed to it if the log level is set to any level', () => {
            logger.logLevel(LogLevel.Debug);
            logger.error('test');
            expect(testConsole.log).toHaveBeenCalledWith('test');

            logger.logLevel(LogLevel.Error);
            logger.error('test');
            expect(testConsole.log).toHaveBeenCalledWith('test');
        });

        it('should not log to the console if the logToConsole flag is set to false in the provider', () => {
            logger.logLevel(LogLevel.Debug);
            logger.logToConsole(false);
            logger.error('test');
            expect(testConsole.log).not.toHaveBeenCalled();
        });

        it('should call the customAction function set in the provider', () => {
            var customAction = jasmine.createSpy('customAction');

            logger.logLevel(LogLevel.Debug);
            logger.customAction(customAction);
            logger.error('test');
            expect(customAction).toHaveBeenCalledWith('error', ['test']);
        });
    });

    describe('log()', () => {
        it('should log the info passed to it if the log level is set to any level', () => {
            logger.logLevel(LogLevel.Debug);
            logger.log('test');
            expect(testConsole.log).toHaveBeenCalledWith('test');

            logger.logLevel(LogLevel.Error);
            logger.log('test');
            expect(testConsole.log).toHaveBeenCalledWith('test');
        });

        it('should not log to the console if the logToConsole flag is set to false in the provider', () => {
            logger.logLevel(LogLevel.Debug);
            logger.logToConsole(false);
            logger.log('test');
            expect(testConsole.log).not.toHaveBeenCalled();
        });

        it('should call the customAction function set in the provider', () => {
            var customAction = jasmine.createSpy('customAction');

            logger.logLevel(LogLevel.Debug);
            logger.customAction(customAction);
            logger.log('test');
            expect(customAction).toHaveBeenCalledWith('log', ['test']);
        });
    });

});