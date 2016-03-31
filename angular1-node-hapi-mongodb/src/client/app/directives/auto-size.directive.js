(function() {
    'use strict';

    /**
     * idAutoSize
     *
     * This directive auto-sizes a textarea element to the size of its contents.
     */
    angular
        .module('app.directives')
        .directive('idAutoSize', autoSize);

    /**
     * Internal function that returns the directive.
     * @returns {object} the angular directive
     */
    autoSize.$inject = ['$timeout']
    function autoSize($timeout) {
        return {
            link: function(scope, element) {
                function resize() {
                    if (element[0].scrollHeight < 1) {
                        return;
                    }
                    while(element[0].clientHeight >= element[0].scrollHeight) {
                        element[0].style.height =
                            parseInt(getComputedStyle(element[0]).getPropertyValue('height'), 10) - 1 + "px";
                    }
                    while(element[0].clientHeight < element[0].scrollHeight) {
                        element[0].style.height =
                            parseInt(getComputedStyle(element[0]).getPropertyValue('height'), 10) + 1 + "px";
                    }
                }

                element.css('overflow', 'hidden');
                element.bind('keyup', function() {resize()});

                $timeout(function() {
                    resize();
                });
            }
        };
    }

})();
