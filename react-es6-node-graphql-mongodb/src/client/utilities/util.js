class Util {

    /**
     * Determines if the given value is an object.
     * @param {*} val
     * @returns {boolean}
     */
    isObject(val) {
        return typeof val === 'object' && !Array.isArray(val);
    }

    /**
     * Determines if the given value is a function.
     * @param {*} val
     * @returns {boolean}
     */
    isFunction(val) {
        return val && Object.prototype.toString.call(val) === '[object Function]';
    }

    /**
     * Determines if the given value is a string.
     * @param {*} val
     * @returns {boolean}
     */
    isString(val) {
        return typeof val === 'string';
    }

    /**
     * Determines if the given value is a boolean.
     * @param {*} val
     * @returns {boolean}
     */
    isBoolean(val) {
        return typeof val === 'boolean';
    }

    /**
     * Determines if the given value is a number.
     * @param {*} val
     * @returns {boolean}
     */
    isNumber(val) {
        return typeof val === 'number';
    }

    /**
     * Determines if the given value is an array.
     * @param {*} val
     * @returns {boolean}
     */
    isArray(val) {
        return Array.isArray(val);
    }

    /**
     * Determines if the given value is defined (e.g. not undefined, null or an empty string).
     * @param {*} val
     * @returns {boolean}
     */
    isDefined(val) {
        return (val !== null && val !== undefined && val !== '');
    }

    /**
     * Determines if the given value is empty or consists only of whitespace characters.
     * @param {String|Array|Object} val
     * @returns {boolean}
     */
    isEmpty(val) {
        let str;

        if (!val) {
            return true;
        }

        if (this.isString(val)) {
            return val.trim().length === 0;
        } else if (this.isArray(val)) {
            return val.length === 0;
        } else if (this.isObject(val)) {
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
    clone(obj) {
        if (!this.isArray(obj) && !this.isObject(obj)) {
            return obj;
        }

        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * Retrieves an array containing the names of all properties owned by the given object.
     * @param {object} obj
     * @returns {Array}
     */
    getOwnProperties(obj) {
        let result = [];
        if (this.isObject(obj)) {
            for (let prop in obj) {
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
    formatCurrency(num, places) {
        return '$' + num.toFixed(places).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    /**
     * Rounds a number to the specified number of decimal places.
     * @param {number} num the number to round
     * @param {number} places the number of decimal places to round to
     * @returns {number} the rounded number
     */
    round(num, places) {
        if (!places || places < 0) {
            return Math.round(num);
        }
        let m = Math.pow(10, places);
        return Math.round(num * m) / m;
    }

    /**
     * Joins two or more parts of a path.
     * @param {string[]} parts the parts of the path to join
     * @param {string=} sep the separator to use (default: '/')
     * @returns {string} the joined path
     */
    pathJoin(parts, sep) {
        let separator = sep || '/';
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
    detokenize(text, valueMap) {
        for (let prop in valueMap) {
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
    countProperties(obj) {
        let count = 0;
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                count++;
            }
        }
        return count;
    }

    /**
     * Returns a string that represents the contents of an array.
     * @param {Array} arr the array
     * @param {string|null?} sep the separator to use between values
     * @returns {string}
     */
    arrayToString(arr, sep, predicate) {
        if (!this.isDefined(arr)) {
            return '';
        }

        sep = sep || ', ';

        let result = [];
        for (let item of arr) {
            result.push(this.isFunction(predicate) ? predicate(item) : item);
        }
        return result.join(sep);
    }

    /**
     * Returns a compare for use by the Array.sort() to sort objects.
     * @param {string} prop the name of the property to sort by
     * @param {boolean} desc whether or not to sort in descending order
     * @param {function} primer a that transforms the prop before comparing values
     */
    sortCompareFunc(prop, desc, primer){
        let key = function (x) {
            let val = prop ? x[prop] : x;
            return primer ? primer(val) : val
        };
        return function (a,b) {
            let A = key(a), B = key(b);
            return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!desc];
        }
    }

    /**
     * Gets the current date as a ISO-8601 date string.
     * @returns {string}
     */
    getISO8601DateString() {
        let dateObj = new Date();
        let year = dateObj.getUTCFullYear().toString();
        let month = convert((dateObj.getUTCMonth()+1).toString());
        let date = convert(dateObj.getUTCDate().toString());
        let hours = convert(dateObj.getUTCHours().toString());
        let minutes = convert(dateObj.getUTCMinutes().toString());
        let seconds = convert(dateObj.getUTCSeconds().toString());
        return year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds + '.000Z';

        function convert(x) {
            return x.length === 1 ? '0' + x : x;
        }
    }
}

export default new Util();
