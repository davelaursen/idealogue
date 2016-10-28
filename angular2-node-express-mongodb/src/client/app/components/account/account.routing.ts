import { Routes } from '@angular/router';
import { AccountViewPageComponent } from './account-view-page.component';
import { AccountEditPageComponent } from './account-edit-page.component';
import { AccountPasswordPageComponent } from './account-password-page.component';

export const accountRoutes: Routes = [
    {
        path: 'account',
        component: AccountViewPageComponent,
        data: {
            name: 'Account',
            auth: true
        }
    },
    {
        path: 'account/edit',
        component: AccountEditPageComponent,
        data: {
            name: 'EditAccount',
            auth: true
        }
    },
    {
        path: 'account/password',
        component: AccountPasswordPageComponent,
        data: {
            name: 'ChangePassword',
            auth: true
        }
    }
];
