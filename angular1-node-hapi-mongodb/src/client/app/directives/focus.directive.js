(function() {
    'use strict';

    /**
     * idFocus
     *
     * This directive automatically puts focus on an element when it attached to the DOM.
     */
    angular
        .module('app.directives')
        .directive('idFocus', focus);

    /**
     * Internal function that returns the directive.
     * @returns {object} the angular directive
     */
    focus.$inject = ['$timeout']
    function focus($timeout) {
        return {
            scope: {
                idFocus: '@'
            },
            link: function(scope, element) {
                if (scope.idFocus != null) {
                    if (scope.idFocus !== 'false') {
                        doFocus();
                    }

                    scope.$watch('idFocus', function(value) {
                        if (value === 'true') {
                            doFocus();
                        }
                    });
                } else {
                    doFocus();
                }

                function doFocus() {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            }
        };
    }

})();
