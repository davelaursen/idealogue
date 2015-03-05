'use strict';

angular.module('idealogue', [
    'ngRoute',
    'idealogue.utilityServices',
    'idealogue.authServices',
    'idealogue.ideaServices',
    'idealogue.userServices',
    'idealogue.eventingServices',
    'idealogue.coreDirectives',
    'idealogue.ideaDirectives',
    'idealogue.coreControllers',
    'idealogue.ideaControllers',
    'idealogue.personControllers',
    'idealogue.accountControllers',
    'idealogue.loginControllers'
])

.config(['$routeProvider', '$locationProvider', '$httpProvider', 'config', function($routeProvider, $locationProvider, $httpProvider, config) {
    $httpProvider.defaults.headers.common.Authorization = config.apiToken;
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/login', {
            controller: 'LoginCtrl',
            templateUrl: '/views/login.html'
        })
        .when('/register', {
            controller: 'RegisterCtrl',
            templateUrl: '/views/createAccount.html'
        })

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
                idea: function(IdeaLoader, $route) {
                    return IdeaLoader($route.current.params.ideaId);
                },
                people: function(MultiUserLoader) {
                    return MultiUserLoader();
                }
            }
        })
        .when('/ideas/edit/:ideaId', {
            controller: 'IdeaEditCtrl',
            templateUrl: '/views/ideaEdit.html',
            resolve: {
                idea: function(IdeaLoader, $route) {
                    return IdeaLoader($route.current.params.ideaId);
                }
            }
        })
        .when('/ideas/new', {
            controller: 'IdeaNewCtrl',
            templateUrl: '/views/ideaNew.html'
        })

        .when('/people', {
            controller: 'PersonListCtrl',
            templateUrl: '/views/personList.html',
            resolve: {
                people: function(MultiUserLoader) {
                    return MultiUserLoader();
                }
            }
        })
        .when('/people/view/:personId', {
            controller: 'PersonViewCtrl',
            templateUrl: '/views/personView.html',
            resolve: {
                person: function(UserLoader, $route) {
                    return UserLoader($route.current.params.personId);
                }
            }
        })

        .when('/account', {
            controller: 'AccountViewCtrl',
            templateUrl: '/views/accountView.html',
            resolve: {
                user: function(UserLoader, Auth) {
                    return UserLoader(Auth.currentUser().id);
                }
            }
        })
        .when('/account/edit', {
            controller: 'AccountEditCtrl',
            templateUrl: '/views/accountForm.html',
            resolve: {
                user: function(UserLoader, Auth) {
                    return UserLoader(Auth.currentUser().id);
                }
            }
        })
        .when('/account/password', {
            controller: 'AccountPasswordCtrl',
            templateUrl: '/views/changePasswordForm.html',
            resolve: {
                user: function(UserLoader, Auth) {
                    return UserLoader(Auth.currentUser().id);
                }
            }
        })

        .otherwise({redirectTo:'/ideas'});
}]);