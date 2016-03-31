(function() {
    'use strict';

    /**
     * ideaService
     *
     * A service that provides functionality for reading/writing tag data.
     */
    angular
        .module('app.services')
        .factory('tagService', tagService);

    /**
     * Internal function that returns an angular service object.
     */
    tagService.$inject = ['dataService', 'config'];
    function tagService(dataService, config) {
        var service = {
            getAll: getAll
        };

        return service;

        /////////////////////

        /**
         * Retrieves all of the tags in the system.
         * @returns {promise}
         */
        function getAll() {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'tags',
                action: 'get'
            });
        }
    }

})();
