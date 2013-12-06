var app = angular.module('idealogue', ['idealogue.utilityServices','idealogue.coreDirectives','idealogue.ideaControllers','idealogue.personControllers','idealogue.ideaServices']);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/ideas', {
            controller: 'IdeaListCtrl',
            templateUrl: '/views/ideaList.html',
            resolve: {
                ideas: function(MultiIdeaLoader) {
                    return MultiIdeaLoader();
                }
            }
        })
        .when('/ideas/view/:ideaId', {
            controller: 'IdeaViewCtrl',
            templateUrl: '/views/ideaView.html',
            resolve: {
                idea: function(IdeaLoader) {
                    return IdeaLoader();
                },
                people: function(MultiPersonLoader) {
                    return MultiPersonLoader();
                }
            }
        })
        .when('/ideas/edit/:ideaId', {
            controller: 'IdeaEditCtrl',
            templateUrl: '/views/ideaForm.html',
            resolve: {
                idea: function(IdeaLoader) {
                    return IdeaLoader();
                },
                people: function(MultiPersonLoader) {
                    return MultiPersonLoader();
                }
            }
        })
        .when('/ideas/new', {
            controller: 'IdeaNewCtrl',
            templateUrl: '/views/ideaForm.html'
        })

        .when('/people', {
            controller: 'PersonListCtrl',
            templateUrl: '/views/personList.html',
            resolve: {
                people: function(MultiPersonLoader) {
                    return MultiPersonLoader();
                }
            }
        })
        .when('/people/view/:personId', {
            controller: 'PersonViewCtrl',
            templateUrl: '/views/personView.html',
            resolve: {
                person: function(PersonLoader) {
                    return PersonLoader();
                }
            }
        })

        .otherwise({redirectTo:'/ideas'});
});