'use strict';

angular.module('idealogue.coreDirectives', [
    'idealogue.utilityServices',
    'idealogue.ideaServices',
    'idealogue.configServices',
    'idealogue.authServices',
    'idealogue.eventingServices'
])

.directive('idFocus', function() {
    return function($scope, $element) {
        $element[0].focus();
    };
})

.directive('idDisabling', ['Events', function(Events) {
    return {
        scope: {},
        link: function($scope, $element) {
            $scope.$on(Events.disableViewEvent, function(e, val) {
                var isAnchor = ($element[0].localName === 'a');
                if (val === true) {
                    if (isAnchor) {
                        $element.removeAttr("href");
                    } else {
                        $element.attr("disabled", "disabled");
                    }
                } else {
                    if (isAnchor) {
                        $element.attr("href", "javascript:");
                    } else {
                        $element.removeAttr("disabled");
                    }
                }
            });
        }
    };
}])

.directive('idListFilter', ['$timeout', 'Events', 'Util', function($timeout, Events, Util) {
    return {
        restrict: 'E',
        templateUrl: '/views/listFilter.html',
        replace: true,
        link: function($scope, $element) {
            $scope.listFilterHidden = true;

            $scope.$on(Events.hideListFilterEvent, function(e, val) {
                $scope.listFilterHidden = val;

                $timeout(function() {
                    $element.find('input').focus();
                });
            });
        }
    };
}]);