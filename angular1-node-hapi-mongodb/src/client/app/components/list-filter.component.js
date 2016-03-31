(function() {
    'use strict';

    /**
     * idListFilter
     *
     * This component renders a filter field for a list.
     */
    angular
        .module('app.components')
        .component('idListFilter', listFilter());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function listFilter() {
        return {
            templateUrl: 'app/components/list-filter.component.html',
            bindings: {
                showFilter: '=',
                filterStr: '='
            },
            controllerAs: 'vm'
        };
    }

})();
