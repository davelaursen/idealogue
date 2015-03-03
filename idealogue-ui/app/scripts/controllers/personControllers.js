'use strict';

angular.module('idealogue.personControllers', [
    'idealogue.utilityServices',
    'idealogue.userServices'
])

.controller('PersonListCtrl', ['$scope', '$location', 'UtilSvc', 'Auth', 'people', function($scope, $location, UtilSvc, Auth, people) {
    Auth.checkIfLoggedIn();

    people.sort(UtilSvc.sortBy('id', false, function(a){return a.toUpperCase()}));
    $scope.people = people;

    $scope.viewPerson = function(personId) {
        $location.path('/people/view/' + personId);
    }
}])

.controller('PersonViewCtrl', ['$scope', '$location', 'UtilSvc', 'Auth', 'User', 'person', function($scope, $location, UtilSvc, Auth, User, person) {
    Auth.checkIfLoggedIn();

    $scope.person = person;

    $scope.back = function() {
        $location.path('/people');
    }

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
    }

    $scope.printDate = function(dateStr) {
        if (dateStr) {
            return UtilSvc.formatDateString(dateStr, true);
        }
        return null;
    }
}]);