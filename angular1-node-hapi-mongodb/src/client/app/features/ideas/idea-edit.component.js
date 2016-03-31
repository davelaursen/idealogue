(function() {
    'use strict';

    angular
        .module('app.ideas')
        .component('idIdeaEdit', ideaEdit());

    /**
     * Internal function that returns the component.
     * @returns {object} the angular component
     */
    function ideaEdit() {
        return {
            templateUrl: 'app/features/ideas/idea-edit.component.html',
            controller: IdeaEditCtrl,
            controllerAs: 'vm'
        }
    }

    /**
     * Constructor function for the component's controller.
     * @constructor
     */
    IdeaEditCtrl.$inject = [
        '$q', '$state', '$stateParams', 'util', 'authService', 'ideaService', 'userService',
        'skillService', 'technologyService', 'tagService'];
    function IdeaEditCtrl(
            $q, $state, $stateParams, util, authService, ideaService, userService,
            skillService, technologyService, tagService) {
        var vm = this;

        // lifecycle hooks
        vm.$onInit = onInit;

        // scope functions
        vm.save = save;
        vm.back = back;
        vm.removeProposer = removeProposer;
        vm.addProposer = addProposer;
        vm.onProposerSelected = onProposerSelected;
        vm.addSkill = addSkill;
        vm.removeSkill = removeSkill;
        vm.saveSkill = saveSkill;
        vm.cancelSkill = cancelSkill;
        vm.addTech = addTech;
        vm.removeTech = removeTech;
        vm.saveTech = saveTech;
        vm.cancelTech = cancelTech;
        vm.addTag = addTag;
        vm.removeTag = removeTag;
        vm.saveTag = saveTag;
        vm.cancelTag = cancelTag;

        /////////////////////

        /**
         * Initializes the component.
         */
        function onInit() {
            vm.isCreate = true;
            vm.showPersonSearch = false;
            vm.newSkill = "";
            vm.showNewSkill = false;
            vm.hideNewSkillButton = false;
            vm.newSkillFocus = false;
            vm.newTech = "";
            vm.showNewTech = false;
            vm.hideNewTechButton = false;
            vm.newTechFocus = false;
            vm.newTag = "";
            vm.showNewTag = false;
            vm.hideNewTagButton = false;
            vm.newTagFocus = false;

            var loaders = [
                userService.getAll(),
                skillService.getAll(),
                technologyService.getAll(),
                tagService.getAll()
            ];
            if ($stateParams.id) {
                vm.isCreate = false;
                loaders.push(ideaService.getById($stateParams.id));
            }

            $q.all(loaders).then(function(data) {
                var people, skills, techs, tags;

                people = data[0];
                skills = data[1];
                techs = data[2];
                tags = data[3];

                people.sort(util.sortCompareFunc('lastName', false, function(a){return a.toUpperCase()}));
                skills.sort(sortFunc);
                techs.sort(sortFunc);
                tags.sort(sortFunc);

                vm.people = people;
                vm.skills = skills;
                vm.techs = techs;
                vm.tags = tags;

                if (data.length === 5) {
                    vm.idea = ideaService.convertForView(data[4], people);
                } else {
                    vm.idea = ideaService.newIdea();
                    vm.idea.proposers.push(authService.currentUser().id);
                }
            });

            function sortFunc(a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            }
        }

        /**
         * Saves the idea.
         * @param {Form} form  the form containing the idea data to save
         */
        function save(form) {
            var action;

            if (!form.$valid) {
                return;
            }

            vm.idea.updatedDate = util.getISO8601DateString();
            if (vm.isCreate) {
                vm.idea.createdDate = vm.idea.updatedDate;
                action = ideaService.insert;
            } else {
                action = ideaService.update;
            }
            action(ideaService.convertForSave(vm.idea))
                .then(back);
        }

        /**
         * Navigates to the previous idea page.
         */
        function back() {
            if (vm.isCreate) {
                $state.go('ideas');
            } else {
                $state.go('idea-view', { id: vm.idea.id });
            }
        }

        /**
         * Removes a proposer from the idea.
         * @param {number} index  the index of the proposer to remove
         */
        function removeProposer(index) {
            vm.idea.proposers.splice(index, 1);
        }

        /**
         * Opens the person search in order to select a proposer to add to the idea.
         */
        function addProposer() {
            vm.showPersonSearch = true;
        }

        /**
         * Adds a person to the idea's proposer array.
         */
        function onProposerSelected(person) {
            vm.idea.proposers.push(person);
        }

        /**
         * Displays the add skill input.
         */
        function addSkill() {
            vm.showNewSkill = true;
            vm.hideNewSkillButton = true;
            vm.newSkillFocus = true;
        }

        /**
         * Removes a skill from the idea.
         * @param {number} index  the index of the skill to remove
         */
        function removeSkill(index) {
            vm.idea.skills.splice(index, 1);
        }

        /**
         * Adds a skill to the idea's skills array.
         */
        function saveSkill() {
            if (vm.newSkill !== null && !(/^\s*$/).test(vm.newSkill)) {
                vm.idea.skills.push(vm.newSkill);
            }
            cancelSkill();
        }

        /**
         * Cancels adding a skill to the idea's skill array.
         */
        function cancelSkill() {
            vm.newSkill = "";
            vm.showNewSkill = false;
            vm.hideNewSkillButton = false;
            vm.newSkillFocus = false;
        }

        /**
         * Displays the add tech input.
         */
        function addTech() {
            vm.showNewTech = true;
            vm.hideNewTechButton = true;
            vm.newTechFocus = true;
        }

        /**
         * Removes a tech from the idea.
         * @param {number} index  the index of the tech to remove
         */
        function removeTech(index) {
            vm.idea.technologies.splice(index, 1);
        }

        /**
         * Adds a tech to the idea's tech array.
         */
        function saveTech() {
            if (vm.newTech !== null && !(/^\s*$/).test(vm.newTech)) {
                vm.idea.technologies.push(vm.newTech);
            }
            cancelTech();
        }

        /**
         * Cancels adding a tech to the idea's tech array.
         */
        function cancelTech() {
            vm.newTech = "";
            vm.showNewTech = false;
            vm.hideNewTechButton = false;
            vm.newTechFocus = false;
        }

        /**
         * Displays the add tag input.
         */
        function addTag() {
            vm.showNewTag = true;
            vm.hideNewTagButton = true;
            vm.newTagFocus = true;
        }

        /**
         * Removes a tag from the idea.
         * @param {number} index  the index of the tag to remove
         */
        function removeTag(index) {
            vm.idea.tags.splice(index, 1);
        }

        /**
         * Adds a tag to the idea's tag array.
         */
        function saveTag() {
            if (vm.newTag !== null && !(/^\s*$/).test(vm.newTag)) {
                vm.idea.tags.push(vm.newTag);
            }
            cancelTag();
        }

        /**
         * Cancels adding a tag to the idea's tag array.
         */
        function cancelTag() {
            vm.newTag = "";
            vm.showNewTag = false;
            vm.hideNewTagButton = false;
            vm.newTagFocus = false;
        }
    }

})();
