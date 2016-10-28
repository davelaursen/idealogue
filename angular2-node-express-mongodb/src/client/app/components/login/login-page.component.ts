import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    templateUrl: 'app/components/login/login-page.component.html'
})
export class LoginPageComponent {
    username: string;
    password: string;
    message: string;

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) { }

    onSubmit() {
        this._authService.login(this.username, this.password)
            .then(user => {
                    if (user) {
                        setTimeout(() => {
                            this._router.navigate(['/ideas']);
                        }, 100);
                    } else {
                        this.message = 'Invalid credentials';
                    }
            })
            .catch(err => {
                this.message = String(err);
            })
            // .subscribe(
            //     user => {
            //         if (user) {
            //             setTimeout(() => {
            //                 this._router.navigate(['/ideas']);
            //             }, 100);
            //         } else {
            //             this.message = 'Invalid credentials';
            //         }
            //     },
            //     err => this.message = String(err)
            // );
    }

    register() {
        this._router.navigate(['/register']);
    }
}
