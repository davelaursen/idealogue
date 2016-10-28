import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    templateUrl: 'app/components/account/account-view-page.component.html'
})
export class AccountViewPageComponent implements OnInit {
    user: any;

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this.user = {};

        let currentUser = this._authService.getCurrentUser();
        this._userService.getById(currentUser._id)
            .then(user => this.user = user);
    }

    remove(e: Event) {
        e.preventDefault();
        this._userService.remove(this.user._id)
            .then(() => {
                this._authService.logout();
                this._router.navigate(['/login']);
            });
    }
}
