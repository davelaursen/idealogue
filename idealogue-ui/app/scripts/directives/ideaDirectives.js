'use strict';

angular.module('idealogue.ideaDirectives', [])

.directive('newcomment', function(){
	return {
		restrict: 'E',
		templateUrl: '/views/newComment.html',
		link: function(scope, element) {
    		element.find('.comment-new-text').autoSize();

			scope.addComment = function() {
		        element.find('.comment-new').show();
		        element.find('.add-comment-button').hide();
		        element.find('.comment-new-text').focus();
		    };

		    scope.cancelComment = function() {
		    	scope.newComment = null;
		        element.find('.comment-new').hide();
		        element.find('.add-comment-button').show();
		    };

		    scope.saveComment = function() {
		        scope.save();
		        scope.cancelComment();
    		};
		}
	};
})

.directive('personsearch', function(UtilSvc) {
	return {
		restrict: 'E',
		templateUrl: '/views/personSearch.html',
		link: function(scope, element) {
		    scope.openPersonSearchBox = function() {
		        UtilSvc.disableMainUIElements(function() {
		            element.find('.person-search-box *').removeAttr("disabled");
		        })

		        $('.shadow').fadeIn(100);
		        element.find('.person-search-box').fadeIn(100);
		        element.find('#personSearch').focus();
		        element.find('#personSearchFieldName').val('proposers');
		    };

		    scope.closePersonSearchBox = function() {
		        $('.shadow').fadeOut(100);
		        element.find('.person-search-box').fadeOut(100);
		        scope.personSearchResults = [];

		        UtilSvc.enableMainUIElements();
		    };

		    scope.executePersonSearch = function() {
		        var text = element.find('#personSearch').val();
		        var results;
		        if (text === "") {
		            results = scope.people;
		        }
		        else {
		            results = UtilSvc.findMultipleInArray(scope.people, ['firstName','lastName','id'], text);
		        }
		        results.sort(UtilSvc.sortBy('id', false, function(a){return a.toUpperCase()}));
		        scope.personSearchResults = results;
		    };

		    scope.selectPerson = function(person) {
		    	console.log(person);
		    	scope.onPersonSelected(person);
		    	scope.closePersonSearchBox();
		    };
		}
	};
});