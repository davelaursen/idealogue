var coreDirectives = angular.module('idealogue.coreDirectives', ['idealogue.ideaServices','idealogue.configServices','idealogue.authServices']);

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
                $('.search-results').fadeIn(ConfigSvc.searchResultsShowTime);
            }
        }
    }
});

coreDirectives.directive('searchresults', function(ConfigSvc) {
    return {
        restrict: 'E',
        templateUrl: '/views/searchResults.html',
        link: function(scope) {
            scope.close = function() {
                $('.search-results').fadeOut(ConfigSvc.searchResultsShowTime);
            }
        }
    }
});

coreDirectives.directive('navigation', function($location, AuthSvc) {
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
});

coreDirectives.directive('currentuser', function(AuthSvc) {
    return {
        restrict: 'E',
        templateUrl: '/views/currentUser.html',
        link: function(scope) {
            scope.currentUser = function() {
                return AuthSvc.currentUserName();
            }
        }
    }
});