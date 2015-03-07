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

.directive('idCompareTo', function() {
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: '=idCompareTo'
        },
        link: function($scope, $element, $attrs, ngModel) {
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == $scope.otherModelValue;
            };

            $scope.$watch('otherModelValue', function() {
                ngModel.$validate();
            });
        }
    };
})

.directive('idAutoSize', function($timeout) {
    return {
        link: function($scope, $element) {
            $element.autoSize();
            $timeout(function() {
                $.resizeTextArea($element[0]);
            });
        }
    };
})

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
}])

.directive('idHeader', ['$rootScope', '$location', 'Auth', 'Events', function($rootScope, $location, Auth, Events) {
    return {
        restrict: 'E',
        templateUrl: '/views/header.html',
        scope: {},
        replace: true,
        link: function($scope) {
            $scope.searchValue = "";

            //TODO: refactor to watch for changes to Auth.currentUser and auto-update value
            var user = Auth.currentUser();
            if (!user) {
                return '';
            }
            $scope.currentUserName = user.firstName + ' ' + user.lastName;

            $scope.executeSearch = function() {
                $rootScope.$broadcast(Events.executeSearchEvent, $scope.searchValue);
                $scope.searchValue = "";
            };

            $scope.goToIdeas = function() {
                $location.path('/ideas');
            };

            $scope.goToPeople = function() {
                $location.path('/people');
            };

            $scope.goToAccount = function() {
                $location.path('/account');
            };

            $scope.logout = function() {
                Auth.logout();
            };
        }
    };
}]);