(function() {
    'use strict';

    /**
     * idCompareTo
     *
     * This directive provides the ability to compare the ngModel value of an element to another
     * value on the scope.
     */
    angular
        .module('app.directives')
        .directive('idCompareTo', compareTo);

    /**
     * Internal function that returns the directive.
     * @returns {object} the angular directive
     */
    function compareTo() {
        return {
            require: 'ngModel',
            scope: {
                otherModelValue: '=idCompareTo'
            },
            link: function(scope, element, attrs, ngModel) {
                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch('otherModelValue', function() {
                    ngModel.$validate();
                });
            }
        };
    }

})();
