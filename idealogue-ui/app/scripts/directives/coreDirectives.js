'use strict';

angular.module('idealogue.coreDirectives', [
    'idealogue.utilityServices',
    'idealogue.ideaServices',
    'idealogue.configServices',
    'idealogue.authServices'
])

.directive('focus', function () {
    return {
        link: function (scope, element) {
            element[0].focus();
        }
    }
})

.directive('searchform', function(UtilSvc, config) {
    return {
        restrict: 'E',
        templateUrl: '/views/searchForm.html',
        link: function(scope) {
            scope.executeSearch = function() {
                $('.search-results').fadeIn(config.searchResultsShowTime);
                $('.shadow').fadeIn(config.searchResultsShowTime);
                UtilSvc.disableMainUIElements();
            }
        }
    }
})

.directive('searchresults', function(UtilSvc, config) {
    return {
        restrict: 'E',
        templateUrl: '/views/searchResults.html',
        link: function(scope, element) {
            scope.close = function() {
                element.fadeOut(config.searchResultsShowTime);
                $('.shadow').fadeOut(config.searchResultsShowTime);
                UtilSvc.enableMainUIElements();
            }
        }
    }
})

.directive('navigation', function($location, AuthSvc) {
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

            scope.logout = function() {
                AuthSvc.logout();
            }
        }
    }
})

.directive('currentuser', function(AuthSvc) {
    return {
        restrict: 'E',
        templateUrl: '/views/currentUser.html',
        link: function(scope) {
            scope.currentUser = function() {
                return AuthSvc.currentUserName();
            }
        }
    }
})

.directive('autofocus', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function($scope, $element) {
            $timeout(function() {
                $element[0].focus();
            });
        }
    }
}]);