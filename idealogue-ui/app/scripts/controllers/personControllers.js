'use strict';

angular.module('idealogue.personControllers', [
    'idealogue.utilityServices',
    'idealogue.userServices'
])

.controller('PersonListCtrl', ['$rootScope', '$scope', '$location', 'Util', 'Auth', 'Events', 'people', function($rootScope, $scope, $location, Util, Auth, Events, people) {
    $scope.showHeader();
    Auth.checkIfLoggedIn();

    people.sort(Util.sortBy('lastName', false, function(a){return a.toUpperCase()}));
    $scope.people = people;
    $scope.desc = false;
    $scope.hideFilter = true;

    $scope.viewPerson = function(personId) {
        $location.path('/people/view/' + personId);
    };

    $scope.sort = function() {
        $scope.desc = !$scope.desc;
        $scope.people.sort(Util.sortBy('lastName', $scope.desc, function(a){return a.toUpperCase()}));
    };

    $scope.filter = function() {
        $scope.hideFilter = !$scope.hideFilter;
        $rootScope.$broadcast(Events.hideListFilterEvent, $scope.hideFilter);
    };
}])

.controller('PersonViewCtrl', ['$scope', '$location', 'Util', 'Auth', 'User', 'person', function($scope, $location, Util, Auth, User, person) {
    $scope.showHeader();
    Auth.checkIfLoggedIn();

    $scope.person = person;

    $scope.back = function() {
        $location.path('/people');
    };

    $scope.vote = function() {
//        var user = $scope.person;
//        var votes = user.votes;
//        var id = Auth.currentUser();
//
//        if ($.inArray(id, votes) === -1) {
//            votes[votes.length] = id;
//            user.voteCount = parseInt(user.voteCount)+1;
//            User.save(user, function() {
//                $scope.person = user;
//            });
//        }
    };
}]);