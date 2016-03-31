(function() {
    'use strict';

    /**
     * ideaService
     *
     * A service that provides functionality for reading/writing idea data.
     */
    angular
        .module('app.services')
        .factory('ideaService', ideaService);

    /**
     * Internal function that returns an angular service object.
     */
    ideaService.$inject = ['dataService', 'util', 'config'];
    function ideaService(dataService, util, config) {
        var service = {
            search: search,
            getAll: getAll,
            getById: getById,
            insert: insert,
            update: update,
            remove: remove,
            newIdea: newIdea,
            convertForView: convertForView,
            convertForSave: convertForSave
        };

        return service;

        /////////////////////

        /**
         * Searches for ideas that match the given search value.
         * @param {string} searchValue
         * @returns {promise}
         */
        function search(searchValue) {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'ideas?search={search}',
                action: 'get',
                tokens: { search: searchValue }
            });
        }

        /**
         * Retrieves all of the ideas in the system.
         * @returns {promise}
         */
        function getAll() {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'ideas',
                action: 'get'
            });
        }

        /**
         * Retrieves the idea that has the specified id.
         * @param {string} id
         * @returns {promise}
         */
        function getById(id) {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'ideas/{id}',
                action: 'get',
                tokens: { id: id }
            });
        }

        /**
         * Adds a new idea to the system.
         * @param {object} idea
         * @returns {promise}
         */
        function insert(idea) {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'ideas',
                action: 'post',
                payload: idea
            });
        }

        /**
         * Updates an existing idea.
         * @param {object} idea
         * @returns {promise}
         */
        function update(idea) {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'ideas/{id}',
                action: 'put',
                tokens: { id: idea.id },
                payload: idea
            });
        }

        /**
         * Removes the idea that has the specified id.
         * @param {string} id
         * @returns {promise}
         */
        function remove(id) {
            return dataService.execute({
                baseUrl: config.apiBaseUrl,
                url: 'ideas/{id}',
                action: 'delete',
                tokens: { id: id }
            });
        }

        /**
         * Returns an new, initialized idea object.
         */
        function newIdea() {
            var dateStr = util.getISO8601DateString();
            return {
                name: "",
                summary: "",
                benefits: "",
                details: "",
                state: "Idea",
                tags: [],
                skills: [],
                technologies: [],
                repo: "myrepo",
                proposers: [],
                contributors: [],
                contributorRequests: [],
                isPublic: false,
                votes: [],
                voteCount: 0,
                comments: [],
                createdDate: dateStr,
                updatedDate: dateStr
            };
        }

        //TODO: MOVE THESE OBJECT CONVERSIONS TO THE SERVER

        /**
         * Converts an idea object so that it contains all additional information needed by the views.
         */
        function convertForView(idea, people) {
            var i, len, found, person, proposerObjs, proposerNames, result;

            result = util.clone(idea);
            result.proposerNames = [];

            proposerObjs = [];
            proposerNames = [];
            for (i = 0, len = result.proposers.length; i < len; i++) {
                person = _.find(people, function(p) { return p.id === result.proposers[i]; });
                if (person) {
                    result.proposers[i] = person;
                    result.proposerNames.push(person.firstName + ' ' + person.lastName);
                }
            }

            for (i = 0, len = result.comments.length; i < len; i++) {
                person = _.find(people, function(p) { return p.id === result.comments[i].id; });
                if (person) {
                    result.comments[i].person = person;
                }
            }
            return result;
        }

        /**
         * Converts an idea object so that it has the data that server expects when saving.
         */
        function convertForSave(idea) {
            var i, len, result;

            result = util.clone(idea);

            delete result.proposerNames;
            for (i = 0, len = result.proposers.length; i < len; i++) {
                result.proposers[i] = result.proposers[i].id;
            }
            for (i = 0, len = result.comments.length; i < len; i++) {
                delete result.comments[i].person;
            }
            return result;
        }
    }

})();
