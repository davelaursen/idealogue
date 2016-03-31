(function() {
    'use strict';

    /**
     * localStorageService
     *
     * The localStorageService service provides wrapper functions for working with local storage.
     */
    angular
        .module('blocks.storage')
        .factory('localStorageService', localStorageService);

    /**
     * Internal function that returns the localStorageService object.
     * @returns {object} the Angular service object
     */
    localStorageService.$inject = ['storageService'];
    function localStorageService(storageService) {
        return storageService.local;
    }

}());
