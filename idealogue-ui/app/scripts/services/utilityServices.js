'use strict';

angular.module('idealogue.utilityServices', [])

.factory('Util', function UtilFactory() {
    return {
        randomUUID: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },

        getISO8601DateString: function() {
            var convert = function(x) { return x.length === 1 ? '0'+x : x; }
            var dateObj = new Date();
            var year = dateObj.getUTCFullYear().toString();
            var month = convert((dateObj.getUTCMonth()+1).toString());
            var date = convert(dateObj.getUTCDate().toString());
            var hours = convert(dateObj.getUTCHours().toString());
            var minutes = convert(dateObj.getUTCMinutes().toString());
            var seconds = convert(dateObj.getUTCSeconds().toString());
            var str = year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds + '.000Z';
            return str;
        },

        sortBy: function(field, desc, primer){
            var key = function (x) {
                var val = field ? x[field] : x;
                return primer ? primer(val) : val
            };
            return function (a,b) {
                var A = key(a), B = key(b);
                return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!desc];
            }
        },

        arrayToString: function(arr, prop) {
            if (!arr) return '';
            if (prop) {
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i][prop];
                }
            }
            return arr.join(', ');
        },

        findMultipleInArray: function(arr, properties, text) {
            if (!arr || arr.length === 0) {
                return [];
            }
            if (!text || text === '') {
                return arr;
            }
            if (!properties || properties.length === 0) {
                properties = [];
                for (var prop in arr[0]) {
                    properties.push(prop);
                }
            }
            var isMatch,
                results = [],
                index = 0;

            text = text.toLowerCase();
            for (var i = 0; i < arr.length; i++) {
                isMatch = false;
                for (var j = 0; j < properties.length; j++) {
                    var val = arr[i][properties[j]];
                    if (val && val.toLowerCase().indexOf(text) > -1) {
                        isMatch = true;
                        break;
                    }
                }
                if (isMatch === true) {
                    results[index++] = arr[i];
                }
            }
            return results;
        },

        findInArray: function(arr, value, partialMatch) {
            var i, len, item, found = [];
            if (value) {
                value = value.toLowerCase();
            }
            for (i = 0, len = arr.length; i < len; i++) {
                item = arr[i] ? arr[i].toLowerCase() : arr[i];
                if (!partialMatch || partialMatch === false) {
                    if (item === value) {
                        found.push(i);
                    }
                }
                else {
                    if (item && item.indexOf(value) >= 0) {
                        found.push(i);
                    }
                }
            }
            return found;
        },

        findInObjectArray: function(arr, prop, value, partialMatch) {
            var i, len, item, found = [];
            if (!prop) {
                return [];
            }
            if (typeof value === 'string') {
                value = value.toLowerCase();
            }
            for (i = 0, len = arr.length; i < len; i++) {
                item = arr[i][prop] && typeof arr[i][prop] === 'string' ? arr[i][prop].toLowerCase() : arr[i][prop];
                if (!partialMatch || partialMatch === false) {
                    if (item === value) {
                        found.push(i);
                    }
                }
                else {
                    if (item === value || (item && typeof item === 'string' && item.indexOf(value) >= 0)) {
                        found.push(i);
                    }
                }
            }
            return found;
        }
    }
});