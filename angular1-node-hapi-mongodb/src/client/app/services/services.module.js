(function() {
    'use strict';

    /**
     * app.services
     *
     * This module provides services for use throughout the application.
     */
    angular.module('app.services', [
        'blocks.data',
        'blocks.storage',
        'blocks.util',
        'app.config'
    ]);

})();
