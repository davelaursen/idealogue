(function() {
    'use strict';

    /**
     * authService
     *
     * A service that provides authorization functionality.
     */
    angular
        .module('app.services')
        .factory('authService', authService);

    /**
     * Internal function that returns an angular service object.
     */
    authService.$inject = ['dataService', 'sessionStorageService', 'util', 'config', 'eventingService'];
    function authService(dataService, sessionStorageService, util, config, eventingService) {
        var service = {
            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
            login: login,
            logout: logout,
            signup: signup
        };

        return service;

        /////////////////////

        /**
         * Determines if the current user is logged in.
         * @returns {boolean}
         */
        function isLoggedIn() {
            var currentUser = sessionStorageService.getItem('CurrentUser');
            return !!currentUser;
        }

        /**
         * Gets or sets the current user.
         * @param {object?} user  the user to set
         * @returns {object?} the current user, if no user was passed in
         */
        function currentUser(user) {
            if (util.isDefined(user)) {
                sessionStorageService.setItem('CurrentUser', user);
                _fireAccountChangeEvent(user);
            } else {
                return sessionStorageService.getItem('CurrentUser');
            }
        }

        /**
         * Logs a user into the system.
         * @param {string} username
         * @param {string} password
         * @returns {promise}
         */
        function login(username, password) {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'login',
                action: 'post',
                payload: { username: username, password: password }
            }).then(function(data) {
                if (!data.message) {
                    sessionStorageService.setItem('CurrentUser', data);
                    _fireAccountChangeEvent(data);
                }
                return data;
            });
        }

        /**
         * Logs the current user out of the sytem.
         * @returns {promise}
         */
        function logout() {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'logout',
                action: 'get'
            }).then(function(data) {
                sessionStorageService.removeItem('CurrentUser');
                _fireAccountChangeEvent(null);
                return data;
            });
        }

        /**
         * Signs up a new user.
         * @param {object} user
         * @returns {promise}
         */
        function signup(user) {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'signup',
                action: 'post',
                payload: user
            });
        }

        /////////////////////

        /**
         * Fires the accountChange event.
         * @param {string} val
         */
        function _fireAccountChangeEvent(val) {
            eventingService.fireEvent('accountChange', val);
        }
    }

})();
