import { Routes } from '@angular/router';
import { PersonListPageComponent } from './person-list-page.component';
import { PersonViewPageComponent } from './person-view-page.component';

export const peopleRoutes: Routes = [
    {
        path: 'people',
        component: PersonListPageComponent,
        data: {
            name: 'People',
            auth: true
        }
    },
    {
        path: 'people/:id',
        component: PersonViewPageComponent,
        data: {
            name: 'ViewPerson',
            auth: true
        }
    }
];
