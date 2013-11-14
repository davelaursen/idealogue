var configServices = angular.module('idealogue.configServices', []);

configServices.service('ConfigSvc', function() {
    return {
        restBaseUrl: 'http://127.0.0.1:8000',

        viewIndexMap: {
            ideaList: 0,
            ideaView: 1,
            ideaEdit: 1,
            ideaAdd: 1,
            peopleList: 2,
            peopleView: 3,
            peopleEdit: 3,
            accountView: 4
        },

        initialLoadDelay: 200,
        scrollTime: 400,
        arrowFadeTime: 100,
        navTipFadeTime: 50,
        searchBoxShowTime: 400,
        resizeTime: 300,
        resizeDelay: 100,
        bg1TopBase: 25,
        bg1LeftBase: 50,
        bg2TopBase: 50,
        bg2LeftBase: 100,
        contentBottomOffset: 110
    }
});