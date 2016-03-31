(function() {
    'use strict';

    /**
     * util
     *
     * The util service provides generic utility functions.
     */
    angular
        .module('blocks.util')
        .factory('util', util);

    /**
     * Internal function that returns a service object.
     * @returns {object} the Angular service object
     */
    function util() {

        var service = {
            isObject: isObject,
            isFunction: isFunction,
            isString: isString,
            isBoolean: isBoolean,
            isNumber: isNumber,
            isArray: isArray,
            isDefined: isDefined,
            isEmpty: isEmpty,
            clone: clone,
            getOwnProperties: getOwnProperties,
            formatCurrency: formatCurrency,
            round: round,
            pathJoin: pathJoin,
            detokenize: detokenize,
            countProperties: countProperties,
            arrayToString: arrayToString,
            sortCompareFunc: sortCompareFunc,
            getISO8601DateString: getISO8601DateString
        };

        return service;

        /////////////////////

        /**
         * Determines if the given value is an object.
         * @param {*} val
         * @returns {boolean}
         */
        function isObject(val) {
            return typeof val === 'object' && !Array.isArray(val);
        }

        /**
         * Determines if the given value is a function.
         * @param {*} val
         * @returns {boolean}
         */
        function isFunction(val) {
            return val && Object.prototype.toString.call(val) === '[object Function]';
        }

        /**
         * Determines if the given value is a string.
         * @param {*} val
         * @returns {boolean}
         */
        function isString(val) {
            return typeof val === 'string';
        }

        /**
         * Determines if the given value is a boolean.
         * @param {*} val
         * @returns {boolean}
         */
        function isBoolean(val) {
            return typeof val === 'boolean';
        }

        /**
         * Determines if the given value is a number.
         * @param {*} val
         * @returns {boolean}
         */
        function isNumber(val) {
            return typeof val === 'number';
        }

        /**
         * Determines if the given value is an array.
         * @param {*} val
         * @returns {boolean}
         */
        function isArray(val) {
            return Array.isArray(val);
        }

        /**
         * Determines if the given value is defined (e.g. not undefined, null or an empty string).
         * @param {*} val
         * @returns {boolean}
         */
        function isDefined(val) {
            return (val !== null && val !== undefined && val !== '');
        }

        /**
         * Determines if the given value is empty or consists only of whitespace characters.
         * @param {String|Array|Object} val
         * @returns {boolean}
         */
        function isEmpty(val) {
            var str;

            if (!val) {
                return true;
            }

            if (isString(val)) {
                return val.trim().length === 0;
            } else if (isArray(val)) {
                return val.length === 0;
            } else if (isObject(val)) {
                str = JSON.stringify(val);
                return (str === '{}' || str === '[]');
            }
            return false;
        }

        /**
         * Clones a javascript object.
         * @param {object} obj the object to clone
         * @returns {object}
         */
        function clone(obj) {
            if (!isArray(obj) && !isObject(obj)) {
                return obj;
            }

            return JSON.parse(JSON.stringify(obj));
        }

        /**
         * Retrieves an array containing the names of all properties owned by the given object.
         * @param {object} obj
         * @returns {Array}
         */
        function getOwnProperties(obj) {
            var prop, result = [];

            if (isObject(obj)) {
                for (prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        result.push(prop);
                    }
                }
            }
            return result;
        }

        /**
        * Rounds and formats a number to a US currency value.
        * @param {number} num the number to convert to a currency value
        * @param {number} places the number of decimal places to round to
        * @returns {string} the rounded currency value
        */
        function formatCurrency(num, places) {
            return '$' + num.toFixed(places).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }

        /**
         * Rounds a number to the specified number of decimal places.
         * @param {number} num the number to round
         * @param {number} places the number of decimal places to round to
         * @returns {number} the rounded number
         */
        function round(num, places) {
            if (!places || places < 0) {
                return Math.round(num);
            }
            var m = Math.pow(10, places);
            return Math.round(num * m) / m;
        }

        /**
         * Joins two or more parts of a path.
         * @param {string[]} parts the parts of the path to join
         * @param {string=} sep the separator to use (default: '/')
         * @returns {string} the joined path
         */
        function pathJoin(parts, sep) {
            var separator = sep || '/';
            return parts.map(function(path) {
                if (path[0] === separator) {
                    path = path.slice(1);
                }
                if (path[path.length - 1] === separator) {
                    path = path.slice(0, path.length - 1);
                }
                return path;
            }).join(separator);
        }

        /**
         * Replaces named tokens (surrounded by curly braces) with values from the given map.
         * @param {string} text the tokenized string
         * @param {object} valueMap the map containing token values
         * @returns {string}
         */
        function detokenize(text, valueMap) {
            var prop;
            for (prop in valueMap) {
                if (valueMap.hasOwnProperty(prop)) {
                    text = text.replace('{' + prop + '}', valueMap[prop]);
                }
            }
            return text;
        }

        /**
         * Returns the number of properties (e.g. keys) in an object.
         * @param {object} obj
         * @returns {number}
         */
        function countProperties(obj) {
            var prop, count;

            count = 0;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    count++;
                }
            }
            return count;
        }

        /**
         * Returns a string that represents the contents of an array.
         * @param {Array} arr the array
         * @param {string|null?} prop the name of the property
         * @param {string|null?} sep the separator to use between values
         * @returns {string}
         */
        function arrayToString(arr, prop, sep) {
            var i, len, result;

            if (!isDefined(arr)) {
                return '';
            }

            sep = sep || ', ';

            result = [];
            for (i = 0, len = arr.length; i < len; i++) {
                result.push(isDefined(prop) ? arr[i].prop : arr[i]);
            }
            return result.join(sep);
        }

        /**
         * Returns a compare function for use by the Array.sort() function to sort objects.
         * @param {string} prop the name of the property to sort by
         * @param {boolean} desc whether or not to sort in descending order
         * @param {function} primer a function that transforms the prop before comparing values
         */
        function sortCompareFunc(prop, desc, primer){
            var key = function (x) {
                var val = prop ? x[prop] : x;
                return primer ? primer(val) : val
            };
            return function (a,b) {
                var A = key(a), B = key(b);
                return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!desc];
            }
        }

        /**
         * Gets the current date as a ISO-8601 date string.
         * @returns {string}
         */
        function getISO8601DateString() {
            var dateObj = new Date();
            var year = dateObj.getUTCFullYear().toString();
            var month = convert((dateObj.getUTCMonth()+1).toString());
            var date = convert(dateObj.getUTCDate().toString());
            var hours = convert(dateObj.getUTCHours().toString());
            var minutes = convert(dateObj.getUTCMinutes().toString());
            var seconds = convert(dateObj.getUTCSeconds().toString());
            return year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds + '.000Z';

            function convert(x) {
                return x.length === 1 ? '0' + x : x;
            }
        }
    }

})();
