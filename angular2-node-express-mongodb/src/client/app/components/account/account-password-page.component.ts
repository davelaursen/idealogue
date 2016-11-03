import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    templateUrl: 'app/components/account/account-password-page.component.html'
})
export class AccountPasswordPageComponent implements OnInit {
    user: any;
    form: FormGroup;
    formSubmitted: boolean;
    passwords: any;

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this.passwords = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        };

        let currentPasswordValidator = (c: FormControl) => {
            return this.user && c.value === this.user.password ? null : {
                passwordIncorect: 'password is incorrect'
            };
        };

        let confirmPasswordValidator = (c: FormControl) => {
            return c.value === this.passwords.newPassword ? null : {
                mustMatch: 'passwords must match'
            };
        };

        this.form = new FormGroup({
            oldPassword: new FormControl('', [Validators.required, currentPasswordValidator]),
            newPassword: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', [Validators.required, confirmPasswordValidator])
        });

        let currentUser = this._authService.getCurrentUser();
        this._userService.getById(currentUser._id)
            .then(user => this.user = user);
    }

    cancel() {
        this._router.navigate(['/account']);
    }

    save() {
        this.formSubmitted = true;
        if (this.form.valid) {
            this.user.password = this.passwords.newPassword;
            this._authService.updateUser(this.user)
                .then(success => {
                    if (success) {
                        this._router.navigate(['/account']);
                    } else {
                        console.log('user update failed');
                    }
                });
        }
    }
}
