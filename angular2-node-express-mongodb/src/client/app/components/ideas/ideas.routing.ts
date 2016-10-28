import { Routes } from '@angular/router';
import { IdeaCreationPageComponent } from './idea-creation-page.component';
import { IdeaListPageComponent } from './idea-list-page.component';
import { IdeaViewPageComponent } from './idea-view-page.component';
import { IdeaEditPageComponent } from './idea-edit-page.component';

export const ideasRoutes: Routes = [
    {
        path: 'ideas',
        component: IdeaListPageComponent,
        data: {
            name: 'Ideas',
            auth: true
        }
    },
    {
        path: 'ideas/new',
        component: IdeaCreationPageComponent,
        data: {
            name: 'NewIdea',
            auth: true
        }
    },
    {
        path: 'ideas/:id',
        component: IdeaViewPageComponent,
        data: {
            name: 'ViewIdea',
            auth: true
        }
    },
    {
        path: 'ideas/:id/edit',
        component: IdeaEditPageComponent,
        data: {
            name: 'EditIdea',
            auth: true
        }
    }
];
