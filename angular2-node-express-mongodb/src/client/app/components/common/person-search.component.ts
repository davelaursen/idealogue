import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from '../../blocks/util/util.service';
import { UserService, IUser } from '../../services/user.service';

@Component({
    selector: 'id-person-search',
    templateUrl: 'app/components/common/person-search.component.html'
})
export class PersonSearchComponent {
    @Input() people: IUser[] = [];
    @Input() excludeList: IUser[] = [];
    @Output() selectPerson = new EventEmitter<IUser>();
    @Output() close = new EventEmitter<void>();

    searchStr: string = '';
    filteredList: IUser[] = [];
    searchResults: IUser[] = [];

    constructor(
        private _router: Router,
        private _util: Util,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this.filteredList = [].concat(this.people).filter(u => {
            let found = this.excludeList.find(i => i._id === u._id);
            return !found;
        });
    }

    closeLightbox() {
        this.close.emit();
    }

    executeSearch() {
        if (this._util.isEmpty(this.searchStr)) {
            this.searchResults = this.filteredList;
            return;
        }

        let str = this.searchStr.toLowerCase();
        let results = this.filteredList.filter(p => {
            return p.firstName.toLowerCase().indexOf(str) > -1 ||
                p.lastName.toLowerCase().indexOf(str) > -1 ||
                p.username.toLowerCase().indexOf(str) > -1 ||
                p.email.toLowerCase().indexOf(str) > -1;
        });
        this.searchResults = results;
    }

    onSelectPerson(person: IUser) {
        this.selectPerson.emit(person);
        this.closeLightbox();
    }
}
