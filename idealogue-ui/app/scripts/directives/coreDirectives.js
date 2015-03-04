'use strict';

angular.module('idealogue.coreDirectives', [
    'idealogue.utilityServices',
    'idealogue.ideaServices',
    'idealogue.configServices',
    'idealogue.authServices'
])

.directive('focus', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element[0].focus();
        }
    };
})

.directive('header', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/header.html',
        link: function(scope, element) {
            scope.showHeader = function() {
                scope.headerHidden = false;
            };

            scope.hideHeader = function() {
                scope.headerHidden = true;
            };

            scope.enableHeader = function() {
                scope.enableSearchForm();
                scope.enableNav();
            };

            scope.disableHeader = function() {
                scope.disableSearchForm();
                scope.disableNav();
            };
        }
    };
})

.directive('navigation', ['$location', 'Auth', function($location, Auth) {
    return {
        restrict: 'E',
        templateUrl: '/views/navigation.html',
        link: function(scope, element) {
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
                Auth.logout();
            };

            scope.enableNav = function() {
                element.find('a').attr('href', '#');
            };

            scope.disableNav = function() {
                element.find('a').removeAttr('href');
            };
        }
    };
}])

.directive('currentuser', ['Auth', function(Auth) {
    return {
        restrict: 'E',
        templateUrl: '/views/currentUser.html',
        link: function(scope) {
            scope.getCurrentUserName = function() {
                var user = Auth.currentUser();
                if (!user) {
                    return '';
                }
                return user.firstName + ' ' + user.lastName;
            };
        }
    };
}])

.directive('searchform', ['Util', 'config', function(Util, config) {
    return {
        restrict: 'E',
        templateUrl: '/views/searchForm.html',
        link: function(scope, element) {
            scope.executeSearch = function() {
                scope.showSearchResults();
            };

            scope.enableSearchForm = function() {
                element.find('input').removeAttr('disabled');
            };

            scope.disableSearchForm = function() {
                element.find('input').attr('disabled', 'disabled');
            };
        }
    };
}])

.directive('searchresults', ['config', function(config) {
    return {
        restrict: 'E',
        templateUrl: '/views/searchResults.html',
        link: function(scope, element) {
            scope.showSearchResults = function(time) {
                element.fadeIn(time || config.searchResultsShowTime);
                scope.disableMainUIElements();
            };

            scope.closeSearchResults = function(time) {
                element.fadeOut(time || config.searchResultsShowTime);
                scope.enableMainUIElements();
            };
        }
    };
}])

.directive('personsearch', ['Util', 'User', function(Util, User) {
    return {
        restrict: 'E',
        templateUrl: '/views/personSearch.html',
        link: function(scope, element) {
            User.getMany(function(response) {
                scope.people = response.data;
            });

            scope.personSearchValue = "";
            scope.personSearchConfig = {
                time: 100,
                onOpen: function(){},
                onClose: function(){},
                onSelect: function(){}
            };

            scope.openPersonSearchBox = function(time, onOpen, onClose, onSelect) {
                scope.personSearchConfig.time = time;
                scope.personSearchConfig.onOpen = onOpen;
                scope.personSearchConfig.onClose = onClose;
                scope.personSearchConfig.onSelect = onSelect;

                element.fadeIn(scope.personSearchConfig.time);
                scope.personSearchConfig.onOpen();
                element.find('input:first').focus();
            };

            scope.closePersonSearchBox = function() {
                element.fadeOut(scope.personSearchConfig.time);
                scope.personSearchConfig.onClose();
                scope.personSearchResults = [];
            };

            scope.executePersonSearch = function() {
                var text = scope.personSearchValue;
                var results;
                if (text === "") {
                    results = scope.people;
                }
                else {
                    results = Util.findMultipleInArray(scope.people, ['firstName','lastName','id'], text);
                }
                results.sort(Util.sortBy('id', false, function(a){return a.toUpperCase()}));
                scope.personSearchResults = results;
            };

            scope.selectPerson = function(person) {
                scope.personSearchConfig.onSelect(person);
                scope.closePersonSearchBox();
            };
        }
    };
}]);