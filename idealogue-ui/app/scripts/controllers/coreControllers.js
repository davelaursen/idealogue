'use strict';

angular.module('idealogue.coreControllers', [])

.controller('MainCtrl', ['$scope', function($scope) {
    $scope.overlayHidden = true;
    $scope.searchResultsHidden = true;
    $scope.personSearchHidden = true;

    $scope.disableMainUIElements = function() {
        $scope.disableHeader();
        $('.content *').attr("disabled", "disabled");
        $('.content a').removeAttr("href");
    };

    $scope.enableMainUIElements = function() {
        $scope.enableHeader();
        $('.content *').removeAttr("disabled");
        $('.content a').attr("href", "javascript:");
    };
}]);