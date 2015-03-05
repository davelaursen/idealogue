'use strict';

angular.module('idealogue.eventingServices', [])

.constant('Events', {
	executeSearchEvent: 'executeSearch',
	openSearchResultsEvent: 'openSearchResults',
	closeSearchResultsEvent: 'closeSearchResults',
	hideHeaderEvent: 'hideHeader',
	disableViewEvent: 'disableView',
	openPersonSearchBoxEvent: 'openPersonSearchBox',
	closePersonSearchBoxEvent: 'closePersonSearchBox'
});