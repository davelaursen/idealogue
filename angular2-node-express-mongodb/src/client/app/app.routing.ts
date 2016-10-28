import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './components/base/shell.component';
import { NotFoundComponent } from './components/base/not-found.component';
import { AuthGuard } from './services/auth-guard.service';

import { loginRoutes } from './components/login/login.routing';
import { ideasRoutes } from './components/ideas/ideas.routing';
import { peopleRoutes } from './components/people/people.routing';
import { accountRoutes } from './components/account/account.routing';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/ideas',
        pathMatch: 'full'
    },
    {
        path: 'signup',
        redirectTo: '/register',
        pathMatch: 'full'
    },
    ...loginRoutes,
    {
        path: '',
        component: ShellComponent,
        canActivateChild: [AuthGuard],
        children: [
            ...ideasRoutes,
            ...peopleRoutes,
            ...accountRoutes
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
// @RouteConfig([
//     { path: '/', name: 'root', redirectTo: ['Ideas'] },

//     { path: '/login', name: 'Login', component: LoginPage },
//     { path: '/register', name: 'Register', component: SignupPage },

//     { path: '/ideas', name: 'Ideas', component: IdeaListPage },
//     // { path: '/ideas/new', name: 'NewIdea', component: IdeaCreationPage },
//     // { path: '/ideas/:id', name: 'ViewIdea', component: IdeaViewPage },
//     // { path: '/ideas/:id/edit', name: 'EditIdea', component: IdeaEditPage },

//     { path: '/people', name: 'People', component: PersonListPage },
//     { path: '/people/:id', name: 'ViewPerson', component: PersonViewPage },

//     { path: '/account', name: 'Account', component: AccountViewPage },
//     { path: '/account/edit', name: 'EditAccount', component: AccountEditPage },
//     // { path: '/account/password', name: 'ChangePassword', component: AccountPasswordPage },

//     { path: '/signup', name: 'Signup', redirectTo: ['Register'] },

//     { path: '/*path', component: NotFoundComponent }
// ])
