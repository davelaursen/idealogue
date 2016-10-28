import { StorageService } from './storage.service';
import { Util } from '../util/util.service';

describe('Util Service', () => {
    let storageService: StorageService;

    beforeEach(() => {
        storageService = new StorageService(
            new Util(), {}
        );
    });

    it('should exist', () => {
        expect(storageService).toBeDefined();
    });

    describe('keyPrefix()', () => {
        it('should properly get/set the key prefix', () => {
            expect(storageService.keyPrefix()).toEqual('');

            storageService.keyPrefix('test');
            expect(storageService.keyPrefix()).toEqual('test');
        });
    });

    describe('StorageService', () => {
        afterEach(() => {
            sessionStorage.clear();
        });

        describe('setItem()', () => {
            it('should properly set a string value in session storage', () => {
                storageService.session.setItem('key', 'test');
                expect(sessionStorage.getItem('key')).toEqual('test');
            });

            it('should properly set an object value in session storage', () => {
                var obj = { test: 'test' };
                storageService.session.setItem('key', obj);
                expect(sessionStorage.getItem('key')).toEqual(JSON.stringify(obj));
            });

            it('should properly set an array value in session storage', () => {
                var arr = ['test', { test: 'test' }];
                storageService.session.setItem('key', arr);
                expect(sessionStorage.getItem('key')).toEqual(JSON.stringify(arr));
            });

            it('should return true if the requested item was set', () => {
                var success = storageService.session.setItem('key', 'test');
                expect(sessionStorage.getItem('key')).toEqual('test');
                expect(success).toBe(true);
            });

            it('should return false and not set the value if the provided key was invalid', () => {
                var key: any = '';
                var success = storageService.session.setItem(key, 'test');
                expect(sessionStorage.getItem(key)).toBeNull();
                expect(success).toBe(false);

                key = 1;
                success = storageService.session.setItem(key, 'test');
                expect(sessionStorage.getItem(key)).toBeNull();
                expect(success).toBe(false);

                key = null;
                success = storageService.session.setItem(key, 'test');
                expect(sessionStorage.getItem(key)).toBeNull();
                expect(success).toBe(false);
            });

            it('should add a prefix to the key if one was configured in the provider', () => {
                var prefix = 'x:';
                storageService.keyPrefix(prefix);

                var key = 'key';
                storageService.session.setItem(key, 'test');
                expect(sessionStorage.getItem(key)).toBeNull();
                expect(sessionStorage.getItem(prefix + key)).toEqual('test');
            });
        });

        describe('getItem()', () => {
            it('should properly get a string value from session storage', () => {
                sessionStorage.setItem('key', 'test');
                expect(storageService.session.getItem('key')).toEqual('test');
            });

            it('should properly get an object value from session storage', () => {
                var obj = { test: 'test' };
                sessionStorage.setItem('key', JSON.stringify(obj));
                expect(storageService.session.getItem('key')).toEqual(obj);
            });

            it('should properly get an array value from session storage', () => {
                var arr = ['test', { test: 'test' }];
                sessionStorage.setItem('key', JSON.stringify(arr));
                expect(storageService.session.getItem('key')).toEqual(arr);
            });

            it('should return null if the requested item was not in storage', () => {
                expect(storageService.session.getItem('key')).toBeNull();
            });

            it('should return null if the provided key was invalid', () => {
                var key: any = '';
                sessionStorage.setItem(key, 'test');
                expect(storageService.session.getItem(key)).toBeNull();

                key = 1;
                sessionStorage.setItem(key, 'test');
                expect(storageService.session.getItem(key)).toBeNull();

                key = null;
                sessionStorage.setItem(key, 'test');
                expect(storageService.session.getItem(key)).toBeNull();
            });

            it('should add a prefix to the key if one was configured in the provider', () => {
                var prefix = 'x:';
                storageService.keyPrefix(prefix);

                var key = 'key';
                sessionStorage.setItem(prefix + key, 'test');
                expect(storageService.session.getItem(key)).toEqual('test');
            });
        });

        describe('removeItem()', () => {
            it('should properly remove an entry from session storage and return true', () => {
                sessionStorage.setItem('key', 'test');
                expect(sessionStorage.getItem('key')).toEqual('test');

                var success = storageService.session.removeItem('key');
                expect(sessionStorage.getItem('key')).toBeNull();
                expect(success).toEqual(true);
            });

            it('should return true if the entry to remove does not exist in storage', () => {
                var success = storageService.session.removeItem('key');
                expect(success).toEqual(true);
            });

            it('should return false if the provided key was invalid', () => {
                expect(storageService.session.removeItem('')).toBe(false);
                expect(storageService.session.removeItem(null)).toBe(false);
            });

            it('should add a prefix to the key if one was configured in the provider', () => {
                var prefix = 'x:';
                storageService.keyPrefix(prefix);

                var key = 'key';
                sessionStorage.setItem(prefix + key, 'test');
                storageService.session.removeItem(key);
                expect(sessionStorage.getItem(prefix + key)).toBeNull();
            });
        });

        describe('clear()', () => {
            it('should properly clear all entries from session storage', () => {
                sessionStorage.setItem('key1', 'test1');
                sessionStorage.setItem('key2', 'test2');

                storageService.session.clear();
                expect(sessionStorage.getItem('key1')).toBeNull();
                expect(sessionStorage.getItem('key2')).toBeNull();
            });
        });

        describe('containsKey()', () => {
            it('should return true if the given key exists in session storage', () => {
                sessionStorage.setItem('key1', 'test1');
                sessionStorage.setItem('key2', 'test2');

                expect(storageService.session.containsKey('key1')).toBe(true);
                expect(storageService.session.containsKey('key2')).toBe(true);
            });

            it('should return false if the given key does not exist in session storage', () => {
                expect(storageService.session.containsKey('key1')).toBe(false);
                expect(storageService.session.containsKey('key2')).toBe(false);
            });

            it('should add a prefix to the key if one was configured in the provider', () => {
                var prefix = 'x:';
                storageService.keyPrefix(prefix);

                sessionStorage.setItem(prefix + 'key1', 'test1');
                sessionStorage.setItem(prefix + 'key2', 'test2');

                expect(storageService.session.containsKey('key1')).toBe(true);
                expect(storageService.session.containsKey('key2')).toBe(true);
            });
        });
    });

});