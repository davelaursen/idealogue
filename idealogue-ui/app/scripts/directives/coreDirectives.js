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
        restrict: 'A',
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

.directive('idHeader', ['Events', function(Events) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/views/header.html',
        scope: {},
        link: function($scope) {
            $scope.$on(Events.hideHeaderEvent, function(e, val) {
                $scope.headerHidden = val;
            });
        }
    };
}])

.directive('idNavigation', ['$location', 'Auth', function($location, Auth) {
    return {
        restrict: 'E',
        templateUrl: '/views/navigation.html',
        replace: true,
        scope: {},
        link: function($scope, $element) {
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
}])

.directive('idCurrentUser', ['Auth', function(Auth) {
    return {
        restrict: 'E',
        templateUrl: '/views/currentUser.html',
        replace: true,
        scope: {},
        link: function($scope) {
            $scope.getCurrentUserName = function() {
                var user = Auth.currentUser();
                if (!user) {
                    return '';
                }
                return user.firstName + ' ' + user.lastName;
            };
        }
    };
}])

.directive('idSearchForm', ['$rootScope', 'Util', 'Events', 'config', function($rootScope, Util, Events, config) {
    return {
        restrict: 'E',
        templateUrl: '/views/searchForm.html',
        replace: true,
        scope: {},
        link: function($scope, $element) {
            $scope.searchValue = "";

            $scope.executeSearch = function() {
                $rootScope.$broadcast(Events.executeSearchEvent, $scope.searchValue);
                $scope.searchValue = "";
            };
        }
    };
}])

.directive('idSearchResults', ['$rootScope', 'Events', 'config', function($rootScope, Events, config) {
    return {
        restrict: 'E',
        templateUrl: '/views/searchResults.html',
        replace: true,
        scope: {},
        link: function($scope, $element) {
            $element.addClass("overlay");

            $scope.closeSearchResults = function() {
                $element.fadeOut(config.searchResultsShowTime);
                $rootScope.$broadcast(Events.closeSearchResultsEvent, true);
            };

            $scope.$on(Events.openSearchResultsEvent, function(e, val) {
                $element.fadeIn(config.searchResultsShowTime);
            });
        }
    };
}])

.directive('idPersonSearch', ['$rootScope', 'Util', 'Events', 'User', function($rootScope, Util, Events, User) {
    return {
        restrict: 'E',
        templateUrl: '/views/personSearch.html',
        replace: true,
        scope: {},
        link: function($scope, $element) {
            $element.addClass("overlay");

            User.getMany(function(response) {
                $scope.people = response.data;
            });

            $scope.personSearchValue = "";
            $scope.personSearchResults = [];
            $scope.onSelect = function(person){};

            $scope.executePersonSearch = function() {
                var text = $scope.personSearchValue;
                var results;
                if (text === "") {
                    results = $scope.people;
                }
                else {
                    results = Util.findMultipleInArray($scope.people, ['firstName','lastName','id'], text);
                }
                results.sort(Util.sortBy('id', false, function(a){return a.toUpperCase()}));
                $scope.personSearchResults = results;
            };

            $scope.closePersonSearchBox = function() {
                $element.fadeOut(100);
                $scope.personSearchResults = [];
                $rootScope.$broadcast(Events.closePersonSearchBoxEvent, true);
            };

            $scope.selectPerson = function(person) {
                $scope.onSelect(person);
                $scope.closePersonSearchBox();
            };

            $scope.$on(Events.openPersonSearchBoxEvent, function(e, onSelect) {
                if (onSelect) {
                    $scope.onSelect = onSelect;
                }

                $element.fadeIn(100);
                $element.find('input:first').focus();
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