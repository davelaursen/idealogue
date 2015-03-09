'use strict';

angular.module('idealogue.coreControllers', [])

.controller('MainCtrl', ['$rootScope', '$scope', 'Events', function($rootScope, $scope, Events) {
    var disableView = function(disabled) {
        $rootScope.$broadcast(Events.disableViewEvent, disabled);
    };

    $scope.hideHeader = function() {
        $scope.headerVisible = false;
    };

    $scope.showHeader = function() {
        $scope.headerVisible = true;
    };

    $scope.executeSearchAction = function(query) {
        $rootScope.$broadcast(Events.openSearchResultsEvent, query);
        disableView(true);
    };

    $scope.closeSearchResultsAction = function() {
        disableView(false);
    };

    $scope.openPersonSearchBoxAction = function(onSelect) {
        $rootScope.$broadcast(Events.openPersonSearchBoxEvent, onSelect);
        disableView(true);
    };

    $scope.closePersonSearchBoxAction = function() {
        disableView(false);
    };
}])

.controller('SearchCtrl', ['$scope', function($scope) {
    $scope.searchValue = "";

    $scope.executeSearch = function() {
        $scope.executeSearchAction($scope.searchValue);
        $scope.searchValue = "";
    };
}])

.controller('CurrentUserCtrl', ['$scope', 'Auth', function($scope, Auth) {
    var getFullName = function(user) {
        if (user) {
            return user.firstName + ' ' + user.lastName;
        }
        return "";
    };
    
    $scope.currentUserName = getFullName(Auth.currentUser());

    $scope.$watch(
        function() {
            return getFullName(Auth.currentUser());
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

.controller('SearchResultsCtrl', ['$scope', 'Events', function($scope, Events) {
    $scope.closeSearchResults = function() {
        $scope.searchResultsVisible = false;
        $scope.closeSearchResultsAction();
    };

    $scope.$on(Events.openSearchResultsEvent, function(e, val) {
        $scope.searchResultsVisible = true;
    });
}])

.controller('PersonSearchCtrl', ['$scope', 'Util', 'Events', 'User', function($scope, Util, Events, User) {
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
        $scope.personSearchVisible = false;
        $scope.personSearchValue = "";
        $scope.personSearchResults = [];
        $scope.closePersonSearchBoxAction();
    };

    $scope.selectPerson = function(person) {
        $scope.onSelect(person);
        $scope.closePersonSearchBox();
    };

    $scope.$on(Events.openPersonSearchBoxEvent, function(e, onSelect) {
        if (onSelect) {
            $scope.onSelect = onSelect;
        }
        User.getMany(function(response) {
            $scope.people = response.data;
        });

        $scope.personSearchValue = "";
        $scope.personSearchResults = [];
        $scope.personSearchVisible = true;
    });
}]);