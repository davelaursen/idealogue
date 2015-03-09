'use strict';

angular.module('idealogue.coreControllers', [
    'idealogue.eventingServices'
])

.controller('MainCtrl', ['$rootScope', '$scope', 'Events', function($rootScope, $scope, Events) {
    $scope.headerHidden = true;

    $scope.hideHeader = function() {
        $scope.headerHidden = true;
    };

    $scope.showHeader = function() {
        $scope.headerHidden = false;
    };

    $scope.disableView = function() {
        $rootScope.$broadcast(Events.disableViewEvent, true);
    };

    $scope.enableView = function() {
        $rootScope.$broadcast(Events.disableViewEvent, false);
    };

    $scope.openPersonSearchBox = function(onSelect) {
        $rootScope.$broadcast(Events.openPersonSearchBoxEvent, onSelect);
        $scope.disableView();
    }

    $scope.openSearchResults = function(searchQuery) {
        $rootScope.$broadcast(Events.openSearchResultsEvent, searchQuery);
        $scope.disableView();
    }

    $scope.$on(Events.executeSearchEvent, function(e, val) {
        $scope.openSearchResults(val);
    });

    $scope.$on(Events.closeSearchResultsEvent, function(e, val) {
        $scope.enableView();
    });

    $scope.$on(Events.closePersonSearchBoxEvent, function(e, val) {
        $scope.enableView();
    })
}])

.controller('SearchCtrl', ['$rootScope', '$scope', 'Auth', 'Events', function($rootScope, $scope, Auth, Events) {
    $scope.searchValue = "";

    $scope.executeSearch = function() {
        $rootScope.$broadcast(Events.executeSearchEvent, $scope.searchValue);
        $scope.searchValue = "";
    };
}])

.controller('CurrentUserCtrl', ['$scope', 'Auth', function($scope, Auth) {
    $scope.currentUserName = Auth.currentUserName();

    $scope.setCurrentUserName = function(user) {
        $scope.currentUserName = user.firstName + ' ' + user.lastName;
    };

    $scope.$watch(
        function() {
            return Auth.currentUserName();
        },
        function(val) {
            $scope.currentUserName = val;
        }
    );
}])

.controller('NavCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
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
}])

.controller('SearchResultsCtrl', ['$rootScope', '$scope', 'Events', function($rootScope, $scope, Events) {
    $scope.searchResultsHidden = true;

    $scope.closeSearchResults = function() {
        $scope.searchResultsHidden = true;
        $rootScope.$broadcast(Events.closeSearchResultsEvent, true);
    };

    $scope.$on(Events.openSearchResultsEvent, function(e, val) {
        $scope.searchResultsHidden = false;
    });
}])

.controller('PersonSearchCtrl', ['$rootScope', '$scope', '$element', '$timeout', 'Util', 'Events', 'User', function($rootScope, $scope, $element, $timeout, Util, Events, User) {
    $scope.personSearchHidden = true;

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
        $scope.personSearchHidden = true;
        $scope.personSearchValue = "";
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

        $scope.personSearchHidden = false;
    });
}]);