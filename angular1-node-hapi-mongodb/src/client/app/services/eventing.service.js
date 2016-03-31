(function() {
    'use strict';

    /**
     * eventingService
     *
     * A service that provides custom eventing functionality.
     */
    angular
        .module('app.services')
        .factory('eventingService', eventingService);

    /**
     * Internal function that returns an angular service object.
     */
    eventingService.$inject = ['util'];
    function eventingService(util) {
        var listeners = {};

        var service = {
            registerListener: registerListener,
            deregisterListener: deregisterListener,
            fireEvent: fireEvent,
            getListeners: getListeners
        };

        return service;

        /////////////////////

        /**
         * Registers an event listener.
         * @param {string} event  the name of the event to listen for
         * @param {string} name  the name of the listener to register
         * @param {function} callback  the listener function to execute when the event fires
         */
        function registerListener(event, name, callback) {
            if (!listeners[event]) {
                listeners[event] = {};
            }
            listeners[event][name] = callback;
        }


        /**
         * De-registers a listener from an event.
         * @param {string} event  the name of the event
         * @param {string} name  the name of the listener to de-register
         * @returns {boolean}  whether the listener was found and removed
         */
        function deregisterListener(event, name) {
            if (listeners[event] && listeners[event][name]) {
                delete listeners[event][name];
                return true;
            }
            return false;
        }


        /**
         * Fires an event.
         * @param {string} event  the name of th event to fire
         * @param {*} data  the data to pass into the event listeners
         */
        function fireEvent(event, data) {
            var i, list;

            list = getListeners(event);
            for (i = 0; i < list.length; i++) {
                if (util.isFunction(list[i])) {
                    list[i](data);
                }
            }
        }


        /**
         * Retrieves all of the listeners registered for an event.
         * @param {string} event  the name of the event to retrieve listeners for
         * @returns {function[]} an array of listener functions
         */
        function getListeners(event) {
            var result, eventObj, prop;

            result = [];
            eventObj = listeners[event];
            if (eventObj) {
                for (prop in eventObj) {
                    if (eventObj.hasOwnProperty(prop)) {
                        result.push(eventObj[prop]);
                    }
                }
            }
            return result;
        }
    }

})();
