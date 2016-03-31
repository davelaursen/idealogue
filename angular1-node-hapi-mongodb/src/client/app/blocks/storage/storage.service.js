(function() {
    'use strict';

    /**
     * storageService
     *
     * The storageService service provides wrapper functions for working with session and local storage.
     */
    angular
        .module('blocks.storage')
        .factory('storageService', storageService);

    /**
     * Internal function that returns the storageService object.
     * @returns {object} the Angular service object
     */
    storageService.$inject = ['util'];
    function storageService(util) {

        var service = {
            session: getService('session'),
            local: getService('local')
        };

        return service;

        /////////////////////

        /**
         * Returns a wrapper around sessionStorage or localStorage.
         * @param {string} type the type of storage wrapper to return
         * @returns {object}
         */
        function getService(type) {
            var storage = (type === 'session' ? sessionStorage : localStorage);

            var service = {
                setItem: setItem,
                setItems: setItems,
                getItem: getItem,
                removeItem: removeItem,
                clear: clear,
                containsKey: containsKey
            };

            return service;

            /////////////////////

            /**
             * Adds an item to storage.
             * @param {string} key
             * @param {string|Object} value
             * @returns {boolean} true if the value was successfully stored, otherwise false
             */
            function setItem(key, value) {
                if (!util.isString(key) || util.isEmpty(key)) {
                    return false;
                }

                if (util.isObject(value) || util.isArray(value)) {
                    storage.setItem(key, JSON.stringify(value));
                } else {
                    storage.setItem(key, value);
                }
                return true;
            }

            /**
             * Add multiple items to session storage. The items array must consist of objects that have
             * either a 'key' or 'id' property (for the item key) and a 'value' property (for the value).
             * @param {object[]} items
             */
            function setItems(items) {
                angular.forEach(items, function(item) {
                    setItem(item.key || item.id, item.value);
                });
            }

            /**
             * Gets an item from session storage.
             * @param {string} key
             * @returns {*}
             */
            function getItem(key) {
                var value;

                if (!util.isString(key) || util.isEmpty(key)) {
                    return null;
                }

                value = storage.getItem(key);
                try {
                    //try to convert to object
                    return JSON.parse(value);
                }
                catch (err) {}

                return value;
            }

            /**
             * Removes an item from session storage.
             * @param {string} key
             * @returns {boolean} true if the value was successfully removed, otherwise false
             */
            function removeItem(key) {
                if (!util.isString(key) || util.isEmpty(key)) {
                    return false;
                }
                storage.removeItem(key);
                return true;
            }

            /**
             * Clears all values from session storage.
             */
            function clear() {
                storage.clear();
            }

            /**
             * Determines if the specified key is in session storage.
             * @param {string} key
             * @returns {boolean}
             */
            function containsKey(key) {
                var i, len;

                if (!util.isString(key) || util.isEmpty(key)) {
                    return false;
                }

                for (i = 0, len = storage.length; i < len; i++) {
                    if (storage.key(i) === key) {
                        return true;
                    }
                }
                return false;
            }
        }
    }

}());
