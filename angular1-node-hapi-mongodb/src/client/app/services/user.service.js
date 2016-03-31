(function() {
    'use strict';

    /**
     * ideaService
     *
     * A service that provides functionality for reading/writing user data.
     */
    angular
        .module('app.services')
        .factory('userService', userService);

    /**
     * Internal function that returns an angular service object.
     */
    userService.$inject = ['dataService', 'config'];
    function userService(dataService, config) {
        var service = {
            search: search,
            getAll: getAll,
            getById: getById,
            getByUsername: getByUsername,
            insert: insert,
            update: update,
            remove: remove,
            newUser: newUser
        };

        return service;

        /////////////////////

        /**
         * Searches for users that match the given search value.
         * @param {string} searchValue
         * @returns {promise}
         */
        function search(searchValue) {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'users?search={search}',
                action: 'get',
                tokens: { search: searchValue }
            });
        }

        /**
         * Retrieves all of the users in the system.
         * @returns {promise}
         */
        function getAll() {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'users',
                action: 'get'
            });
        }

        /**
         * Retrieves the user that has the specified id.
         * @param {string} id
         * @returns {promise}
         */
        function getById(id) {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'users/{id}',
                action: 'get',
                tokens: { id: id }
            });
        }

        /**
         * Retrieves the user that has the specified username.
         * @param {string} username
         * @returns {promise}
         */
        function getByUsername(username) {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'users?username={username}',
                action: 'get',
                tokens: { username: username }
            });
        }

        /**
         * Adds a new user to the system.
         * @param {object} user
         * @returns {promise}
         */
        function insert(user) {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'users',
                action: 'post',
                payload: user
            });
        }

        /**
         * Updates an existing user.
         * @param {object} user
         * @returns {promise}
         */
        function update(user) {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'users/{id}',
                action: 'put',
                tokens: { id: user.id },
                payload: user
            });
        }

        /**
         * Removes the user that has the specified id.
         * @param {string} id
         * @returns {promise}
         */
        function remove(id) {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'users/{id}',
                action: 'delete',
                tokens: { id: id }
            });
        }

        /**
         * Returns an new, initialized user object.
         */
        function newUser() {
            var dateStr = util.getISO8601DateString();
            return {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                isEnabled: true,
                createdDate: dateStr,
                updatedDate: dateStr
            };
        }
    }

})();
