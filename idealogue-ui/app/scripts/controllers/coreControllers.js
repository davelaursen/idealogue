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

    $scope.hideHeader = function() {
        $rootScope.$broadcast(Events.hideHeaderEvent, true);
    };

    $scope.showHeader = function() {
        $rootScope.$broadcast(Events.hideHeaderEvent, false);
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
}]);