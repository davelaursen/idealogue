var app = angular.module('idealogue', ['idealogue.configServices','idealogue.utilityServices','idealogue.coreDirectives','idealogue.ideaDirectives','idealogue.ideaServices']);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/ideas', {
            controller: 'IdeaListCtrl',
            templateUrl: '/views/default.html'
        })
        .when('/ideas/view/:ideaId', {
            controller: 'IdeaViewCtrl',
            templateUrl: '/views/default.html'
        })
        .when('/ideas/edit/:ideaId', {
            controller: 'IdeaEditCtrl',
            templateUrl: '/views/default.html'
        })
        .when('/ideas/new', {
            controller: 'IdeaNewCtrl',
            templateUrl: '/views/default.html'
        })
        .otherwise({redirectTo:'/ideas'});
});

app.controller('IdeaListCtrl', function(ConfigSvc, UtilSvc, IdeaSvc) {
    UtilSvc.placeElements();
    UtilSvc.scrollToView('ideaList');

    // need to delay to allow time for directive to be added to the DOM
    UtilSvc.delay(function() {
        IdeaSvc.loadIdeas();
    }, ConfigSvc.initialLoadDelay);

    $(document).ready(function() {
        $(window).resize(function() {
            UtilSvc.placeElements();
        });
    });
});

app.controller('IdeaViewCtrl', function($route, ConfigSvc, UtilSvc, IdeaSvc) {
    UtilSvc.placeElements();
    UtilSvc.scrollToView('ideaView');

    // need to delay to allow time for directive to be added to the DOM
    UtilSvc.delay(function() {
        IdeaSvc.loadIdea($route.current.params.ideaId);
    }, ConfigSvc.initialLoadDelay);

    $(document).ready(function() {
        $(window).resize(function() {
            UtilSvc.placeElements();
        });
    });
});

app.controller('IdeaEditCtrl', function($route, ConfigSvc, UtilSvc, IdeaSvc) {
    UtilSvc.placeElements();
    UtilSvc.scrollToView('ideaEdit');

    // need to delay to allow time for directive to be added to the DOM
    UtilSvc.delay(function() {
        IdeaSvc.editIdea($route.current.params.ideaId);
    }, ConfigSvc.initialLoadDelay);

    $(document).ready(function() {
        $(window).resize(function() {
            UtilSvc.placeElements();
        });
    });
});

app.controller('IdeaNewCtrl', function(ConfigSvc, UtilSvc, IdeaSvc) {
    UtilSvc.placeElements();
    UtilSvc.scrollToView('ideaAdd');

    // need to delay to allow time for directive to be added to the DOM
    UtilSvc.delay(function() {
        IdeaSvc.newIdea();
    }, ConfigSvc.initialLoadDelay);

    $(document).ready(function() {
        $(window).resize(function() {
            UtilSvc.placeElements();
        });
    });
});