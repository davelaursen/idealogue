import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Util } from '../../blocks/util/util.service';

@Component({
    templateUrl: 'app/components/people/person-list-page.component.html'
})
export class PersonListPageComponent implements OnInit {
    private _sortDesc: boolean;

    people: any[];
    showFilter: boolean;
    filter: string;

    constructor(
        private _router: Router,
        private _userService: UserService,
        private _util: Util) {
    }

    ngOnInit() {
        this._sortDesc = false;
        this.people = [];
        this.showFilter = false;
        this.filter = '';

        this._userService.getAll()
            .then(people => {
                this._sortPeople(people);
                this.people = people;
            });
    }

    viewPerson(person: any) {
        this._router.navigate(['/people', person._id]);
    }

    reverseSortOrder(e: Event) {
        e.preventDefault();
        this._sortDesc = !this._sortDesc;
        this._sortPeople(this.people);
    }

    toggleFilter(e: Event) {
        e.preventDefault();
        this.showFilter = !this.showFilter;
        if (!this.showFilter) {
            this.filter = '';
        }
    }

    onFilterChange(value: string) {
        this.filter = value;
    }

    toList(arr: string[]) {
        return this._util.arrayToString(arr);
    }

    private _sortPeople(people: any[]) {
        people.sort(this._util.sortCompareFunc('lastName', this._sortDesc, (i: string) => i.toUpperCase()));
    }
}
