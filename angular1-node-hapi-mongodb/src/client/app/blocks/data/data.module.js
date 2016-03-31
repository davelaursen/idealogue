(function() {
    'use strict';

    /**
     * blocks.data
     *
     * This application block provides functionality for working with data on a server.
     *
     * This module provides several different ways of making HTTP calls:
     *   ajax: a global variable which simplifies using XMLHttpRequest to make AJAX calls
     *   formService: an Angular service provides a facade for posting form data
     *   restService: an Angular service provides a facade for making REST calls
     *
     * In most cases, the restService will be used. Once of the few instances in which the formService is needed
     * is when uploading a file through a form, which requires that you directly post form data to the server.
     * The ajax object exists on the global scope and provides the ability to make HTTP calls in situations when
     * the developer does not have access to Angular services (i.e. during the 'config' phase when an Angular
     * application first loads).
     */
    angular.module('blocks.data', ['blocks.util']);

})();
