(function() {
    'use strict';

    /**
     * ideaService
     *
     * A service that provides functionality for reading/writing skill data.
     */
    angular
        .module('app.services')
        .factory('skillService', skillService);

    /**
     * Internal function that returns an angular service object.
     */
    skillService.$inject = ['dataService', 'config'];
    function skillService(dataService, config) {
        var service = {
            getAll: getAll
        };

        return service;

        /////////////////////

        /**
         * Retrieves all of the skills in the system.
         * @returns {promise}
         */
        function getAll() {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'skills',
                action: 'get'
            });
        }
    }

})();
