(function() {
    'use strict';

    /**
     * ideaService
     *
     * A service that provides functionality for reading/writing technology data.
     */
    angular
        .module('app.services')
        .factory('technologyService', technologyService);

    /**
     * Internal function that returns an angular service object.
     */
    technologyService.$inject = ['dataService', 'config'];
    function technologyService(dataService, config) {
        var service = {
            getAll: getAll
        };

        return service;

        /////////////////////

        /**
         * Retrieves all of the technologies in the system.
         * @returns {promise}
         */
        function getAll() {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'technologies',
                action: 'get'
            });
        }
    }

})();
