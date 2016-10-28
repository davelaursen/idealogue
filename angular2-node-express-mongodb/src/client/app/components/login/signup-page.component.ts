import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    templateUrl: 'app/components/login/signup-page.component.html'
})
export class SignupPageComponent implements OnInit {
    user: any;
    confirmPassword: string;
    form: FormGroup;
    formSubmitted: boolean;

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) { }

    ngOnInit() {
        this.user = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
        this.confirmPassword = '';

        let confirmPasswordValidator = (c: FormControl) => {
            return c.value === this.user.password ? null : {
                mustMatch: 'passwords must match'
            };
        };

        this.form = new FormGroup({
            username: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', [Validators.required, confirmPasswordValidator])
        });
    }

    back(e: Event) {
        if (e) { e.preventDefault(); }
        this._router.navigate(['/login']);
    }

    create() {
        this.formSubmitted = true;
        if (this.form.valid) {
            this._authService.signup(this.user)
                .then(msg => {
                    if (msg) {
                        this.form.controls['username'].setErrors({ invalidUsername: msg });
                    } else {
                        this._authService.login(this.user.username, this.user.password)
                            .then(user => {
                                if (user) {
                                    this._router.navigate(['/ideas']);
                                } else {
                                    console.log('something weird happened...');
                                }
                            });
                    }
                });
        }
    }
}
