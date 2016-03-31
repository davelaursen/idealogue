(function() {
    'use strict';

    // This file manually bootstraps the Angular application
    var injector, dataService, util, config, sessionStorageService;

    // inject whatever services are needed
    injector = angular.injector(['ng', 'blocks.data', 'blocks.util', 'blocks.storage', 'app.config']);
    dataService = injector.get('dataService');
    util = injector.get('util');
    config = injector.get('config');
    sessionStorageService = injector.get('sessionStorageService');

    // load the currently logged in user from the server, then start the Angular application
    dataService.get(util.pathJoin([config.apiBaseUrl, 'currentuser']))
        .then(function(res) {
            sessionStorageService.setItem('CurrentUser', res.data);
        })
        .catch(function() {
            sessionStorageService.removeItem('CurrentUser');
        })
        .finally(function() {
            angular.element(document).ready(function() {
                angular.bootstrap(document, ['app']);
            });
        });

})();
