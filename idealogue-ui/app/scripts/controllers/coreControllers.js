'use strict';

angular.module('idealogue.coreControllers', [
    'idealogue.eventingServices'
])

.controller('MainCtrl', ['$rootScope', '$scope', 'Events', function($rootScope, $scope, Events) {
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
        $timeout(function() {
            $element.find('input:first').focus();
        });
    });
}]);