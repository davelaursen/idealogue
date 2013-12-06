var coreDirectives = angular.module('idealogue.coreDirectives', ['idealogue.ideaServices','idealogue.configServices']);

coreDirectives.directive('focus', function () {
    return {
        link: function (scope, element) {
            element[0].focus();
        }
    }
});

coreDirectives.directive('searchform', function(ConfigSvc) {
    return {
        restrict: 'E',
        templateUrl: '/views/searchForm.html',
        link: function(scope) {
            scope.executeSearch = function() {
                $('#searchResults').fadeIn(ConfigSvc.searchResultsShowTime);
            }
        }
    }
});

coreDirectives.directive('searchresults', function($rootScope, ConfigSvc) {
    return {
        restrict: 'E',
        templateUrl: '/views/searchResults.html',
        link: function(scope) {
            scope.close = function() {
                $('#searchResults').fadeOut(ConfigSvc.searchResultsShowTime);
            }
        }
    }
});

coreDirectives.directive('navigation', function($rootScope, $location) {
    return {
        restrict: 'E',
        templateUrl: '/views/navigation.html',
        link: function(scope) {
            scope.goToIdeas = function() {
                $location.path('/ideas');
            };

            scope.goToPeople = function() {
                $location.path('/people');
            };

            scope.goToAccount = function() {
                $location.path('/account');
            };
        }
    }
});