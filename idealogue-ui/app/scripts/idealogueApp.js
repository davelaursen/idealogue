var app = angular.module('idealogue', ['ngRoute','idealogue.utilityServices','idealogue.authServices','idealogue.coreDirectives','idealogue.ideaControllers','idealogue.personControllers','idealogue.accountControllers','idealogue.loginControllers','idealogue.ideaServices','idealogue.userServices']);

app.config(function($routeProvider, $locationProvider) {
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
            templateUrl: '/views/ideaForm.html',
            resolve: {
                idea: function(IdeaLoader, $route) {
                    return IdeaLoader($route.current.params.ideaId);
                },
                people: function(MultiUserLoader) {
                    return MultiUserLoader();
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
                user: function(UserLoader, AuthSvc) {
                    return UserLoader(AuthSvc.currentUser());
                }
            }
        })
        .when('/account/edit', {
            controller: 'AccountEditCtrl',
            templateUrl: '/views/accountForm.html',
            resolve: {
                user: function(UserLoader, AuthSvc) {
                    return UserLoader(AuthSvc.currentUser());
                }
            }
        })
        .when('/account/password', {
            controller: 'AccountPasswordCtrl',
            templateUrl: '/views/changePasswordForm.html',
            resolve: {
                user: function(UserLoader, AuthSvc) {
                    return UserLoader(AuthSvc.currentUser());
                }
            }
        })

        .otherwise({redirectTo:'/ideas'});
});