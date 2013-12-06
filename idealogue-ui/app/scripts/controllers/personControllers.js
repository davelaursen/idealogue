var personControllers = angular.module('idealogue.personControllers', ['idealogue.utilityServices','idealogue.personServices']);

personControllers.controller('PersonListCtrl', function($scope, $location, UtilSvc, people) {
    people.sort(UtilSvc.sortBy('username', false, function(a){return a.toUpperCase()}));
    $scope.people = people;

    $scope.viewPerson = function(personId) {
        $location.path('/people/view/' + personId);
    }
});

personControllers.controller('PersonViewCtrl', function($scope, $location, UtilSvc, Person, person) {
    $scope.person = person;

    $scope.back = function() {
        $location.path('/people');
    }

    $scope.vote = function() {
//        var person = $scope.person;
//        var votes = person.votes;
//        var id = UtilSvc.randomUUID();
//        //TODO: replace random UUID with id of logged in user (when implemented)
//
//        if ($.inArray(id, votes) === -1) {
//            votes[votes.length] = id;
//            person.voteCount = parseInt(person.voteCount)+1;
//            Person.save(person, function() {
//                $scope.person = person;
//            });
//        }
    }

    $scope.printDate = function(dateStr) {
        if (dateStr) {
            return UtilSvc.formatDateString(dateStr, true);
        }
    }
});