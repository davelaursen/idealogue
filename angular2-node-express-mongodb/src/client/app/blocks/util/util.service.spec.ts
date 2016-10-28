import { Util } from './util.service';

describe('Util Service', () => {
    let util: Util;

    beforeEach(() => {
        util = new Util();
    });

    it('should exist', () => {
        expect(util).toBeDefined();
    });

    describe('isObject()', () => {
        it('should return true if given an object', () => {
            expect(util.isObject({})).toBe(true);
            expect(util.isObject({x: 1})).toBe(true);
        });

        it('should return false if given a non-object', () => {
            expect(util.isObject([])).toBe(false);
            expect(util.isObject('')).toBe(false);
            expect(util.isObject(1)).toBe(false);
            expect(util.isObject(true)).toBe(false);
            expect(util.isObject(() => {})).toBe(false);
            expect(util.isObject(null)).toBe(false);
            expect(util.isObject(undefined)).toBe(false);
        });
    });

    describe('isFunction()', () => {
        it('should return true if given a function', () => {
            expect(util.isFunction(() => {})).toBe(true);
        });

        it('should return false if given a non-function', () => {
            expect(util.isFunction({})).toBe(false);
            expect(util.isFunction([])).toBe(false);
            expect(util.isFunction('')).toBe(false);
            expect(util.isFunction(1)).toBe(false);
            expect(util.isFunction(true)).toBe(false);
            expect(util.isFunction(null)).toBe(false);
            expect(util.isFunction(undefined)).toBe(false);
        });
    });

    describe('isString()', () => {
        it('should return true if given a string', () => {
            expect(util.isString('')).toBe(true);
        });

        it('should return false if given a non-string', () => {
            expect(util.isString({})).toBe(false);
            expect(util.isString([])).toBe(false);
            expect(util.isString(1)).toBe(false);
            expect(util.isString(true)).toBe(false);
            expect(util.isString(() => {})).toBe(false);
            expect(util.isString(null)).toBe(false);
            expect(util.isString(undefined)).toBe(false);
        });
    });

    describe('isBoolean()', () => {
        it('should return true if given a boolean', () => {
            expect(util.isBoolean(true)).toBe(true);
        });

        it('should return false if given a non-boolean', () => {
            expect(util.isBoolean({})).toBe(false);
            expect(util.isBoolean([])).toBe(false);
            expect(util.isBoolean('')).toBe(false);
            expect(util.isBoolean(1)).toBe(false);
            expect(util.isBoolean(() => {})).toBe(false);
            expect(util.isBoolean(null)).toBe(false);
            expect(util.isBoolean(undefined)).toBe(false);
        });
    });

    describe('isNumber()', () => {
        it('should return true if given a number', () => {
            expect(util.isNumber(1)).toBe(true);
        });

        it('should return false if given a non-number', () => {
            expect(util.isNumber({})).toBe(false);
            expect(util.isNumber([])).toBe(false);
            expect(util.isNumber('')).toBe(false);
            expect(util.isNumber(true)).toBe(false);
            expect(util.isNumber(() => {})).toBe(false);
            expect(util.isNumber(null)).toBe(false);
            expect(util.isNumber(undefined)).toBe(false);
        });
    });

    describe('isArray()', () => {
        it('should return true if given an array', () => {
            expect(util.isArray([])).toBe(true);
        });

        it('should return false if given a non-array', () => {
            expect(util.isArray({})).toBe(false);
            expect(util.isArray('')).toBe(false);
            expect(util.isArray(1)).toBe(false);
            expect(util.isArray(true)).toBe(false);
            expect(util.isArray(() => {})).toBe(false);
            expect(util.isArray(null)).toBe(false);
            expect(util.isArray(undefined)).toBe(false);
        });
    });

    describe('isDefined()', () => {
        it('should return true if the given object is not null, undefined or an empty string', () => {
            expect(util.isDefined({})).toBe(true);
            expect(util.isDefined([])).toBe(true);
            expect(util.isDefined(1)).toBe(true);
            expect(util.isDefined(true)).toBe(true);
            expect(util.isDefined(() => {})).toBe(true);
        });

        it('should return false if the given object is null, undefined or an empty string', () => {
            expect(util.isDefined(null)).toBe(false);
            expect(util.isDefined(undefined)).toBe(false);
            expect(util.isDefined('')).toBe(false);
        });
    });

    describe('isEmpty()', () => {
        it('should return true if the given object is an empty string, array or object or is not defined', () => {
            expect(util.isEmpty('')).toBe(true);
            expect(util.isEmpty([])).toBe(true);
            expect(util.isEmpty({})).toBe(true);
            expect(util.isEmpty(null)).toBe(true);
            expect(util.isEmpty(undefined)).toBe(true);
        });

        it('should return false if the given object is a non-empty string, array or object', () => {
            expect(util.isEmpty('x')).toBe(false);
            expect(util.isEmpty(['x'])).toBe(false);
            expect(util.isEmpty({x:1})).toBe(false);
        });

        it('should return false if the given object is not a string, array or object', () => {
            expect(util.isEmpty(1)).toBe(false);
            expect(util.isEmpty(true)).toBe(false);
            expect(util.isEmpty(() => {})).toBe(false);
        });
    });

    describe('getOwnProperties()', () => {
        it('should return all of the properties owned by the given object', () => {
            var object = {
                one: 1,
                two: 2,
                three: 3
            };
            var props = util.getOwnProperties(object);
            expect(props).toEqual(['one', 'two', 'three']);
        });
    });

    describe('round()', () => {
        it('should round the given number to the specified decimal places', () => {
            expect(util.round(1.23456, 0)).toEqual(1);
            expect(util.round(1.23456, 1)).toEqual(1.2);
            expect(util.round(1.23456, 2)).toEqual(1.23);
            expect(util.round(1.23456, 3)).toEqual(1.235);
            expect(util.round(1.23456, 4)).toEqual(1.2346);
            expect(util.round(1.23456, 10)).toEqual(1.23456);
        });
    });

    describe('pathJoin()', () => {
        it('should join paths', () => {
            var path1 = '1';
            var path2 = '2/';
            var path3 = '3';
            var path4 = '/4';

            expect(util.pathJoin([path1])).toEqual('1');
            expect(util.pathJoin([path1, path2])).toEqual('1/2');
            expect(util.pathJoin([path2, path3])).toEqual('2/3');
            expect(util.pathJoin([path2, path4])).toEqual('2/4');
            expect(util.pathJoin([path2, path3, path4])).toEqual('2/3/4');
            expect(util.pathJoin([path1, path2, path3, path4])).toEqual('1/2/3/4');
        });

        it('should join paths using a specified separator', () => {
            var path1 = '1';
            var path2 = '2/';
            var path3 = '3';
            var path4 = '/4';

            expect(util.pathJoin([path1], ',')).toEqual('1');
            expect(util.pathJoin([path1, path2], ',')).toEqual('1,2/');
            expect(util.pathJoin([path1, path3], ',')).toEqual('1,3');
            expect(util.pathJoin([path2, path4], ',')).toEqual('2/,/4');
            expect(util.pathJoin([path2, path3, path4], ',')).toEqual('2/,3,/4');
            expect(util.pathJoin([path1, path2, path3, path4], ',')).toEqual('1,2/,3,/4');
        });
    });

    describe('detokenize()', () => {
        it('should replace tokens in the given text with value specified in a value map', () => {
            var text = '{x}-two-{y}';
            var map = {
                x: 'one',
                y: 'three'
            };
            expect(util.detokenize(text, map)).toEqual('one-two-three');
        });
    });

    describe('countProperties()', () => {
        it('should return the number of properties in an object', () => {
            var obj1 = {};
            var obj2 = {
                one: 1,
                two: 2,
                three: 3,
                four: 4
            };
            expect(util.countProperties(obj1)).toEqual(0);
            expect(util.countProperties(obj2)).toEqual(4);
        });
    });

    describe('arrayToString()', () => {
        it('should convert a string array to a string', () => {
            var arr = ['1', '2', '3'];
            expect(util.arrayToString(arr)).toEqual('1, 2, 3');
        });

        it('should convert an object array to a string', () => {
            var arr = [{a:1, b:2}, {a:3, b:4}, {a:5, b:6}];
            expect(util.arrayToString(arr)).toEqual('[object Object], [object Object], [object Object]');
            expect(util.arrayToString(arr, 'a')).toEqual('1, 3, 5');
            expect(util.arrayToString(arr, 'b')).toEqual('2, 4, 6');
        });

        it('should convert a array of any kind to a string', () => {
            var arr1 = [1, 2, 3];
            var arr2 = [true, false, true];
            var arr3 = [null, () =>{}, 3];

            expect(util.arrayToString(arr1)).toEqual('1, 2, 3');
            expect(util.arrayToString(arr2)).toEqual('true, false, true');
            expect(util.arrayToString(arr3)).toEqual(', function () { }, 3');
        });

        it('should convert an array to a string using a specified separator', () => {
            var arr = ['1', '2', '3'];
            expect(util.arrayToString(arr, null, '/')).toEqual('1/2/3');
        });

        it('should return an empty string if the given array is null or undefined', () => {
            expect(util.arrayToString(null)).toEqual('');
            expect(util.arrayToString(undefined)).toEqual('');
        });
    });
});