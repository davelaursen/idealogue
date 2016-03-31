(function() {
    'use strict';

    /**
     * idDisabling
     *
     * This directive disables and enables an element that can otherwise be tabbed to (i.e. form
     * elements, buttons, links).
     */
    angular
        .module('app.directives')
        .directive('idDisabling', disabling);

    /**
     * Internal function that returns the directive.
     * @returns {object} the angular directive
     */
    function disabling() {
        return {
            link: function(scope, element) {
                scope.$on('disableView', function(e, val) {
                    var isAnchor = (element[0].localName === 'a');
                    if (val === true) {
                        if (isAnchor) {
                            element.removeAttr("href");
                        } else {
                            element.attr("disabled", "disabled");
                        }
                    } else {
                        if (isAnchor) {
                            element.attr("href", "");
                        } else {
                            element.removeAttr("disabled");
                        }
                    }
                });
            }
        };
    }

})();
