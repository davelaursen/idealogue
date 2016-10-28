import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from '../../blocks/util/util.service';
import { IdeaService, IIdea } from '../../services/idea.service';
import { UserService, IUser } from '../../services/user.service';

@Component({
    templateUrl: 'app/components/ideas/idea-list-page.component.html'
})
export class IdeaListPageComponent implements OnInit {
    private _sortDesc: boolean;

    ideas: IIdea[];
    showFilter: boolean;
    filter: string;

    constructor(
        private _router: Router,
        private _util: Util,
        private _ideaService: IdeaService,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this._sortDesc = false;
        this.ideas = [];
        this.showFilter = false;
        this.filter = '';

        this._userService.getAll()
            .then(users => {
                this._ideaService.getAll(users)
                    .then(ideas => this.ideas = ideas);
            });
    }

    viewIdea(idea: IIdea) {
        this._router.navigate(['/ideas', idea._id]);
    }

    reverseSortOrder(e: Event) {
        e.preventDefault();
        this._sortDesc = !this._sortDesc;
        this._sortIdeas(this.ideas);
    }

    toggleFilter(e: Event) {
        e.preventDefault();
        this.showFilter = !this.showFilter;
        if (!this.showFilter) {
            this.filter = '';
        }
    }

    toList(arr: string[]) {
        return this._util.arrayToString(arr);
    }

    onFilterChange(value: string) {
        this.filter = value;
    }

    private _sortIdeas(ideas: IIdea[]) {
        ideas.sort(this._util.sortCompareFunc('name', this._sortDesc, (i: string) => i.toUpperCase()));
    }
}
