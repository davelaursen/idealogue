import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IdeaService, IIdea } from '../../services/idea.service';
import { SkillService } from '../../services/skill.service';
import { TechnologyService } from '../../services/technology.service';
import { TagService } from '../../services/tag.service';
import { UserService, IUser } from '../../services/user.service';

@Component({
    templateUrl: 'app/components/ideas/idea-edit-page.component.html'
})
export class IdeaEditPageComponent implements OnInit {
    idea: IIdea = null;
    people: IUser[] = [];
    skills: string[] = [];
    techs: string[] = [];
    tags: string[] = [];
    showPersonSearch: boolean = false;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _ideaService: IdeaService,
        private _skillService: SkillService,
        private _techService: TechnologyService,
        private _tagService: TagService,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this._userService.getAll()
            .then(users => {
                this.people = users;
                this._ideaService.getById(this._route.snapshot.params['id'], users)
                    .then(idea => this.idea = idea);
            });
        this._skillService.getAll()
            .then(skills => this.skills = skills);
        this._techService.getAll()
            .then(techs => this.techs = techs);
        this._tagService.getAll()
            .then(tags => this.tags = tags);
    }

    onCancel() {
        this._router.navigate(['/ideas', this.idea._id]);
    }

    onSave() {
        this._ideaService.update(this.idea)
            .then(success => this._router.navigate(['/ideas', this.idea._id]))
            .catch(err => console.log(err));
    }

    onAddProposer() {
        this.showPersonSearch = true;
    }

    onSelectProposer(proposer: IUser) {
        this.idea.proposers.push(proposer);
    }

    onClosePersonSearch() {
        this.showPersonSearch = false;
    }
}
