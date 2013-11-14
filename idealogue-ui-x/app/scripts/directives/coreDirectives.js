var coreDirectives = angular.module('idealogue.coreDirectives', ['idealogue.ideaServices','idealogue.configServices','idealogue.utilityServices']);

coreDirectives.directive('focus', function () {
    return {
        link: function (scope, element) {
            element[0].focus();
        }
    }
});

coreDirectives.directive('searchbox', function($rootScope, UtilSvc) {
    return {
        restrict: 'E',
        templateUrl: '/views/searchBox.html',
        link: function(scope) {
            scope.showSearchBox = function() {
                $('#searchBox').fadeIn(UtilSvc.searchBoxShowTime);
                $('#searchValue').focus();
            };
        }
    }
});

coreDirectives.directive('navigation', function($rootScope, ConfigSvc, UtilSvc, IdeaSvc) {
    return {
        restrict: 'E',
        templateUrl: '/views/navigation.html',
        link: function(scope, element) {
            UtilSvc.setMouseOverNavTipEffect(element.find('img.link'), $('#navtip'));

            scope.goToIdeas = function() {
                IdeaSvc.loadIdeas();
                UtilSvc.scrollToView('ideaList');
            };

            scope.goToPeople = function() {
                UtilSvc.scrollToView('peopleList');
            };

            scope.goToAccount = function() {
                UtilSvc.scrollToView('accountView');
            };

            scope.goToSearch = function() {
                scope.showSearchBox();
            };

            scope.up = function() {
                switch(UtilSvc.selectedView[0]) {
                    case 'p':
                        scope.goToIdeas();
                        break;
                    case 'a':
                        scope.goToPeople();
                        break;
                }
            };

            scope.back = function() {
                switch(UtilSvc.selectedView[0]) {
                    case 'i':
                        scope.goToIdeas();
                        break;
                    case 'p':
                        scope.goToPeople();
                        break;
                }
            };

            scope.down = function() {
                switch(UtilSvc.selectedView[0]) {
                    case 'i':
                        scope.goToPeople();
                        break;
                    case 'p':
                        scope.goToAccount();
                        break;
                }
            };
        }
    }
});