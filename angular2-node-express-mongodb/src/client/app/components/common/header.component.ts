import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'id-header',
    templateUrl: 'app/components/common/header.component.html'
})
export class HeaderComponent implements OnInit {
    searchValue: string;
    currentUserName: string;
    searchResultsVisible: boolean;

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) { }

    ngOnInit() {
        this.searchValue = '';
        this.currentUserName = '';

        this._setCurrentUser(this._authService.getCurrentUser());

        this._authService.onCurrentUserChanged()
            .subscribe(user => this._setCurrentUser(user));
    }

    executeSearch = (e: Event) => {
        e.preventDefault();
        console.log(`executing search for '${this.searchValue}'`);
        this.searchResultsVisible = true;
    }

    clearSearchValue() {
        this.searchResultsVisible = false;
        this.searchValue = '';
    }

    logout = (e: Event) => {
        e.preventDefault();
        this._authService.logout();
        this._router.navigate(['/login']);
    }

    private _setCurrentUser(user: any) {
        this.currentUserName = user ? `${user.firstName} ${user.lastName}` : '';
    }
}
