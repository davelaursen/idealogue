'use strict';

angular.module('idealogue.personControllers', [
    'idealogue.utilityServices',
    'idealogue.userServices'
])

.controller('PersonListCtrl', function($scope, $location, UtilSvc, AuthSvc, people) {
    AuthSvc.checkIfLoggedIn();

    people.sort(UtilSvc.sortBy('id', false, function(a){return a.toUpperCase()}));
    $scope.people = people;

    $scope.viewPerson = function(personId) {
        $location.path('/people/view/' + personId);
    }
})

.controller('PersonViewCtrl', function($scope, $location, UtilSvc, AuthSvc, User, person) {
    AuthSvc.checkIfLoggedIn();

    $scope.person = person;

    $scope.back = function() {
        $location.path('/people');
    }

    $scope.vote = function() {
//        var user = $scope.person;
//        var votes = user.votes;
//        var id = AuthSvc.currentUser();
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
});