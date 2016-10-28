import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { SignupPageComponent } from './signup-page.component';

export const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent,
        data: {
            name: 'Login'
        }
    },
    {
        path: 'register',
        component: SignupPageComponent,
        data: {
            name: 'Register'
        }
    }
];
