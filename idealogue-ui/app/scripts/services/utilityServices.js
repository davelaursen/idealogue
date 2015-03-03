'use strict';

angular.module('idealogue.utilityServices', [])

.factory('UtilSvc', function() {
    return {
        // selectedView: 'ideaList',

        randomUUID: function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c === "x" ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },

        getISO8601DateString:  function() {
            var convert = function(x) { return x.length === 1 ? "0"+x : x; }
            var dateObj = new Date();
            var year = dateObj.getUTCFullYear().toString();
            var month = convert((dateObj.getUTCMonth()+1).toString());
            var date = convert(dateObj.getUTCDate().toString());
            var hours = convert(dateObj.getUTCHours().toString());
            var minutes = convert(dateObj.getUTCMinutes().toString());
            var seconds = convert(dateObj.getUTCSeconds().toString());
            var str = year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + ".000Z";
            return str;
        },

        formatDateString: function(dateStr, dateOnly) {
            var date = new Date();
            date.setUTCFullYear(parseInt(dateStr.substring(0,4),10));
            date.setUTCMonth(parseInt(dateStr.substring(5,7),10)-1);
            date.setUTCDate(parseInt(dateStr.substring(8,10),10));
            if (dateOnly && dateOnly === true) {
                return date.toLocaleDateString();
            }

            date.setUTCHours(parseInt(dateStr.substring(11,13),10));
            date.setUTCMinutes(parseInt(dateStr.substring(14,16),10));
            date.setUTCSeconds(parseInt(dateStr.substring(17,19),10));
            date.setUTCMilliseconds(0);
            return date.toLocaleString();
        },

        sortBy: function(field, desc, primer){
            var key = function (x) {return primer ? primer(x[field]) : x[field]};

            return function (a,b) {
                var A = key(a), B = key(b);
                return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!desc];
            }
        },

        arrayToString: function(arr, prop) {
            if (!arr) return "";
            var strArr = prop ? [] : arr.slice(0);
            if (prop) {
                for (var i = 0; i < arr.length; i++) {
                    strArr[i] = arr[i][prop];
                }
            }

            var result = "";
            for (var j = 0; j < strArr.length; j++) {
                result += (j>0 ? ", " : "") + strArr[j];
            }
            return result;
        },

        findMultipleInArray: function(arr, properties, value) {
            var isMatch,
                results = [],
                index = 0;

            value = value.toLowerCase();
            for (var i = 0; i < arr.length; i++) {
                isMatch = false;
                for (var j = 0; j < properties.length; j++) {
                    var prop = arr[i][properties[j]].toLowerCase();
                    if (prop.indexOf(value) !== -1) {
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

        findInArray: function(arr, prop1, value1, prop2, value2, partialMatch) {
            for (var i = 0, len = arr.length; i < len; i++) {
                if (!partialMatch || partialMatch === false) {
                    if (prop1 && arr[i][prop1] === value1) {
                        if (!prop2 || arr[i][prop2] === value2) {
                            return arr[i];
                        }
                    }
                }
                else if ((prop1 && arr[i][prop1].contains(value1))
                        || (prop2 && arr[i][prop2].contains(value2)))
                {
                    return arr[i];
                }
            }
            return null;
        },

        delay: (function(){
            var timer = 0;
            return function(callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })()
    }
});