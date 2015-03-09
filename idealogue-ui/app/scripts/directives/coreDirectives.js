'use strict';

angular.module('idealogue.coreDirectives', [
    'idealogue.utilityServices',
    'idealogue.ideaServices',
    'idealogue.configServices',
    'idealogue.authServices',
    'idealogue.eventingServices'
])

.directive('idFocus', ['$timeout', function($timeout) {
    return {
        scope: {
            idFocus: '@'
        },
        link: function(scope, element) {
            function doFocus() {
                $timeout(function() {
                    element[0].focus();
                });
            }

            if (scope.idFocus != null) {
                if (scope.idFocus !== 'false') {
                    doFocus();
                }

                scope.$watch('idFocus', function(value) {
                    if (value === 'true') {
                        doFocus();
                    }
                });
            }
            else {
                doFocus();
            }
        }
    };
}])

.directive('idDisabling', ['Events', function(Events) {
    return {
        link: function(scope, element) {
            scope.$on(Events.disableViewEvent, function(e, val) {
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
}])

.directive('idCompareTo', function() {
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
})

.directive('idAutoSize', ['$timeout', function($timeout) {
    return {
        link: function(scope, element) {
            function resize() {
                if (element[0].scrollHeight < 1) {
                    return;
                }
                while(element[0].clientHeight >= element[0].scrollHeight) {
                    element[0].style.height = parseInt(getComputedStyle(element[0]).getPropertyValue('height'), 10) - 1 + "px";
                }
                while(element[0].clientHeight < element[0].scrollHeight) {
                    element[0].style.height = parseInt(getComputedStyle(element[0]).getPropertyValue('height'), 10) + 1 + "px";
                }
            }

            element.css('overflow', 'hidden');
            element.bind('keyup', function() {resize()});

            $timeout(function() {
                resize();
            });
        }
    };
}])

.directive('idListFilter', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/listFilter.html',
        replace: true,
        link: function(scope) {
            scope.listFilterHidden = true;

            scope.toggleFilter = function() {
                scope.listFilterHidden = !scope.listFilterHidden;
            };
        }
    };
});