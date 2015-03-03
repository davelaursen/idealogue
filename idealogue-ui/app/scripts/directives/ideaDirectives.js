'use strict';

angular.module('idealogue.ideaDirectives', [])

.directive('comments', function(){
	return {
		restrict: 'E',
		templateUrl: '/views/comments.html',
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
});