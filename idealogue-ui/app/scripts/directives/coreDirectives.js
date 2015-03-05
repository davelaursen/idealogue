'use strict';

angular.module('idealogue.coreDirectives', [
    'idealogue.utilityServices',
    'idealogue.ideaServices',
    'idealogue.configServices',
    'idealogue.authServices',
    'idealogue.eventingServices'
])

.directive('idFocus', function() {
    return {
        restrict: 'A',
        scope: {},
        link: function($scope, $element) {
            $element[0].focus();
        }
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

.directive('idNavigation', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/navigation.html',
        replace: true,
        scope: {},
        controller: ['$element', '$location', 'Auth', function($element, $location, Auth) {
            this.goToIdeas = function() {
                $location.path('/ideas');
            };

            this.goToPeople = function() {
                $location.path('/people');
            };

            this.goToAccount = function() {
                $location.path('/account');
            };

            this.logout = function() {
                Auth.logout();
            };
        }],
        controllerAs: 'navCtrl'
    };
})

.directive('idCurrentUser', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/currentUser.html',
        replace: true,
        scope: {},
        controller: ['Auth', function(Auth) {
            this.getCurrentUserName = function() {
                var user = Auth.currentUser();
                if (!user) {
                    return '';
                }
                return user.firstName + ' ' + user.lastName;
            };
        }],
        controllerAs: 'currentUserCtrl'
    };
})

.directive('idSearchForm', ['Util', 'config', function(Util, config) {
    return {
        restrict: 'E',
        templateUrl: '/views/searchForm.html',
        replace: true,
        scope: {},
        link: function($scope, $element) {
            $scope.searchValue = "";
        },
        controller: ['$rootScope', '$scope', 'Events', function($rootScope, $scope, Events) {
            this.executeSearch = function() {
                $rootScope.$broadcast(Events.executeSearchEvent, $scope.searchValue);
                $scope.searchValue = "";
            };
        }],
        controllerAs: 'searchFormCtrl'
    };
}])

.directive('idSearchResults', ['Events', 'config', function(Events, config) {
    return {
        restrict: 'E',
        templateUrl: '/views/searchResults.html',
        replace: true,
        scope: {},
        link: function($scope, $element) {
            $element.addClass("overlay");

            $scope.$on(Events.openSearchResultsEvent, function(e, val) {
                console.log("search: " + val);
                $element.fadeIn(config.searchResultsShowTime);
            });
        },
        controller: ['$rootScope', '$scope', '$element', function($rootScope, $scope, $element) {
            this.closeSearchResults = function() {
                $element.fadeOut(config.searchResultsShowTime);
                $rootScope.$broadcast(Events.closeSearchResultsEvent, true);
            };
        }],
        controllerAs: 'searchResultsCtrl'
    };
}])

.directive('idPersonSearch', ['Util', 'Events', 'User', function(Util, Events, User) {
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
            $scope.onSelect = function(person){};

            $scope.$on(Events.openPersonSearchBoxEvent, function(e, onSelect) {
                if (onSelect) {
                    $scope.onSelect = onSelect;
                }

                $element.fadeIn(100);
                $element.find('input:first').focus();
            });
        },
        controller: ['$rootScope', '$scope', '$element', function($rootScope, $scope, $element) {
            this.personSearchResults = [];
            var self = this;

            this.executePersonSearch = function() {
                var text = $scope.personSearchValue;
                var results;
                if (text === "") {
                    results = $scope.people;
                }
                else {
                    results = Util.findMultipleInArray($scope.people, ['firstName','lastName','id'], text);
                }
                results.sort(Util.sortBy('id', false, function(a){return a.toUpperCase()}));
                self.personSearchResults = results;
            };

            this.closePersonSearchBox = function() {
                $element.fadeOut(100);
                self.personSearchResults = [];
                $rootScope.$broadcast(Events.closePersonSearchBoxEvent, true);
            };

            this.selectPerson = function(person) {
                $scope.onSelect(person);
                self.closePersonSearchBox();
            };
        }],
        controllerAs: 'personSearchCtrl'
    };
}]);