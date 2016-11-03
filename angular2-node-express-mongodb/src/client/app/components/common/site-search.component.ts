import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from '../../blocks/util/util.service';
import { IdeaService, IIdea } from '../../services/idea.service';
import { UserService, IUser } from '../../services/user.service';

@Component({
    selector: 'id-site-search',
    templateUrl: 'app/components/common/site-search.component.html'
})
export class SiteSearchComponent implements OnInit {
    @Input() searchStr: string = '';
    @Output() close = new EventEmitter<void>();

    ideaSearchResults: IIdea[] = [];
    personSearchResults: IUser[] = [];
    ideasLoading: boolean = false;
    peopleLoading: boolean = false;

    constructor(
        private _router: Router,
        private _util: Util,
        private _ideaService: IdeaService,
        private _userService: UserService
    ) { }

    ngOnInit() {
        if (!this._util.isEmpty(this.searchStr)) {
            this.executeSearch();
        }
    }

    closeLightbox() {
        this.close.emit();
    }

    executeSearch() {
        this.ideaSearchResults = [];
        this.personSearchResults = [];

        if (this._util.isEmpty(this.searchStr)) {
            return;
        }

        this.ideasLoading = true;
        this.peopleLoading = true;

        this._ideaService.search(this.searchStr)
            .then(results => {
                results.forEach(r => {
                    r.score = this._util.round(r.score, 1);
                });
                // simulate slow call
                setTimeout(() => {
                    this.ideaSearchResults = results;
                    this.ideasLoading = false;
                }, 1500);
            });
        this._userService.search(this.searchStr)
            .then(results => {
                results.forEach(r => {
                    r.score = this._util.round(r.score, 1);
                });
                // simulate slow call
                setTimeout(() => {
                    this.personSearchResults = results;
                    this.peopleLoading = false;
                }, 2000);
            });
    }

    selectIdea(idea: IIdea) {
        this._router.navigate(['/ideas', idea._id]);
        this.closeLightbox();
    }

    selectPerson(person: IUser) {
        this._router.navigate(['/people', person._id]);
        this.closeLightbox();
    }
}
