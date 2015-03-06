'use strict';

angular.module('idealogue.eventingServices', [])

.constant('Events', {
	executeSearchEvent: 'executeSearch',
	openSearchResultsEvent: 'openSearchResults',
	closeSearchResultsEvent: 'closeSearchResults',
	disableViewEvent: 'disableView',
	openPersonSearchBoxEvent: 'openPersonSearchBox',
	closePersonSearchBoxEvent: 'closePersonSearchBox',
	hideListFilterEvent: 'hideListFilter'
});