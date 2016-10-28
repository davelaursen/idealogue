import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IdeaService, IIdea } from '../../services/idea.service';
import { SkillService } from '../../services/skill.service';
import { TechnologyService } from '../../services/technology.service';
import { TagService } from '../../services/tag.service';

@Component({
    templateUrl: 'app/components/ideas/idea-creation-page.component.html'
})
export class IdeaCreationPageComponent implements OnInit {
    idea: IIdea;
    skills: string[];
    techs: string[];
    tags: string[];

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _ideaService: IdeaService,
        private _skillService: SkillService,
        private _techService: TechnologyService,
        private _tagService: TagService
    ) { }

    ngOnInit() {
        this.skills = [];
        this.techs = [];
        this.tags = [];

        this.idea = this._ideaService.newIdea();
        this.idea.proposers.push(this._authService.getCurrentUser());

        this._skillService.getAll()
            .then(skills => this.skills = skills);
        this._techService.getAll()
            .then(techs => this.techs = techs);
        this._tagService.getAll()
            .then(tags => this.tags = tags);
    }

    onCancel() {
        this._router.navigate(['/ideas']);
    }

    onSave() {
        this._ideaService.insert(this.idea)
            .then(idea => this._router.navigate(['/ideas', idea._id]))
            .catch(err => console.log(err));
    }
}
