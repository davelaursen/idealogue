var utilityServices = angular.module('idealogue.utilityServices', ['idealogue.configServices']);

utilityServices.service('UtilSvc', function(ConfigSvc, LocationSvc) {
    return {
        selectedView: 'ideaList',

        sortBy: function(field, desc, primer){
            var key = function (x) {return primer ? primer(x[field]) : x[field]};

            return function (a,b) {
                var A = key(a), B = key(b);
                return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!desc];
            }
        },

        arrayToString: function(arr, prop) {
            if (!arr) return "";
            var strArr = prop ? [] : arr.slice(0);
            if (prop) {
                for (var i = 0; i < arr.length; i++) {
                    strArr[i] = arr[i][prop];
                }
            }

            var result = "";
            for (var j = 0; j < strArr.length; j++) {
                result += (j>0 ? ", " : "") + strArr[j];
            }
            return result;
        },

        transformIdeaForEdit: function(idea) {
            var i;
            for (i = 0; i < idea.skills.length; i++) {
                idea.skills[i] = {value: idea.skills[i]};
            }
            for (i = 0; i < idea.technologies.length; i++) {
                idea.technologies[i] = {value: idea.technologies[i]};
            }
            for (i = 0; i < idea.tags.length; i++) {
                idea.tags[i] = {value: idea.tags[i]};
            }
        },

        transformIdeaForSave: function(idea) {
            var i;
            for (i = 0; i < idea.skills.length; i++) {
                idea.skills[i] = idea.skills[i].value;
            }
            for (i = 0; i < idea.technologies.length; i++) {
                idea.technologies[i] = idea.technologies[i].value;
            }
            for (i = 0; i < idea.tags.length; i++) {
                idea.tags[i] = idea.tags[i].value;
            }
        },

        delay: (function(){
            var timer = 0;
            return function(callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })(),

        placeElements: function() {
            $('div.content').height($(window).height() - ConfigSvc.contentBottomOffset);
            $('#back').offset({top: ($(window).height() - 30)/2});

            var utils = this;
            this.delay(function() {
                utils.scrollToView(utils.selectedView, ConfigSvc.resizeTime);
            }, ConfigSvc.resizeDelay);
        },

        scrollToView: function(view, time) {
            if (!time) {
                time = ConfigSvc.scrollTime;
            }
            var index = ConfigSvc.viewIndexMap[view];

            // scroll to div
            this.selectedView = view;
            $('#wrapper').scrollTo('#box'+index, time);

            // scroll background
            var top1 = parseInt(index/2, 10) * ConfigSvc.bg1TopBase;
            var top2 = parseInt(index/2, 10) * ConfigSvc.bg2TopBase;
            var left1 = (index%2) * ConfigSvc.bg1LeftBase;
            var left2 = (index%2) * ConfigSvc.bg2LeftBase;
            $('#background1').scrollTo({top:top1+'px', left:left1+'px'}, time);
            $('#background2').scrollTo({top:top2+'px', left:left2+'px'}, time);

            // show/hide nav arrows
            var configureArrow = function(id, show) {
                var $arrow = $(id);
                if (show) {
                    $arrow.fadeIn(ConfigSvc.arrowFadeTime);
                }
                else {
                    $arrow.fadeOut(ConfigSvc.arrowFadeTime);
                }
            };

            switch(index) {
                case 0:
                    configureArrow('#up', false);
                    configureArrow('#back', false);
                    configureArrow('#down', true);
                    break;
                case 1:
                    configureArrow('#up', false);
                    configureArrow('#back', true);
                    configureArrow('#down', true);
                    break;
                case 2:
                    configureArrow('#up', true);
                    configureArrow('#back', false);
                    configureArrow('#down', true);
                    break;
                case 3:
                    configureArrow('#up', true);
                    configureArrow('#back', true);
                    configureArrow('#down', true);
                    break;
                case 4:
                    configureArrow('#up', true);
                    configureArrow('#back', false);
                    configureArrow('#down', false);
                    break;
                default:
                    configureArrow('#up', false);
                    configureArrow('#back', false);
                    configureArrow('#down', false);
                    break;
            }
        },

        changeLocation: function(path) {
            LocationSvc.skipReload().path(path).replace();
        },

        setMouseOverNavTipEffect: function(imageElements, navTip) {
            imageElements.mouseenter(function() {
                var target = $(this).attr('id');
                navTip.text(target.substring(target.indexOf('_')));
                navTip.fadeIn(ConfigSvc.navTipFadeTime);
            });
            imageElements.mouseleave(function() {
                navTip.fadeOut(ConfigSvc.navTipFadeTime);
            });
        }
    }
});

utilityServices.service('LocationSvc', function($location, $route, $rootScope) {
    $location.skipReload = function() {
        var lastRoute = $route.current;
        var un = $rootScope.$on('$locationChangeSuccess', function() {
            $route.current = lastRoute;
            un();
        });
        return $location;
    };
    return $location;
});