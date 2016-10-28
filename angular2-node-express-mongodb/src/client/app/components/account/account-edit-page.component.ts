import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    templateUrl: 'app/components/account/account-edit-page.component.html'
})
export class AccountEditPageComponent implements OnInit {
    user: any;
    form: FormGroup;
    formSubmitted: boolean;

    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _authService: AuthService,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this.user = {};

        this.form = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required]
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
