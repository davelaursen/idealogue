'use strict';

angular.module('idealogue.personControllers', [])

.controller('PersonListCtrl', ['$scope', '$location', 'Util', 'people', function($scope, $location, Util, people) {
    $scope.showHeader();

    people.sort(Util.sortBy('lastName', false, function(a){return a.toUpperCase()}));
    $scope.people = people;
    $scope.desc = false;

    $scope.viewPerson = function(personId) {
        $location.path('/people/view/' + personId);
    };

    $scope.sort = function() {
        $scope.desc = !$scope.desc;
        $scope.people.sort(Util.sortBy('lastName', $scope.desc, function(a){return a.toUpperCase()}));
    };

    $scope.filter = function() {
        $scope.toggleFilter();
    };
}])

.controller('PersonViewCtrl', ['$scope', '$location', 'person', function($scope, $location, person) {
    $scope.showHeader();

    $scope.person = person;

    $scope.back = function() {
        $location.path('/people');
    };
}]);