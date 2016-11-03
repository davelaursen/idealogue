import { Routes } from '@angular/router';
import { CssButtonsComponent } from './css-buttons.component';
import { CssFormsComponent } from './css-forms.component';
import { CssShapesComponent } from './css-shapes.component';
import { CssSpinnersComponent } from './css-spinners.component';

export const randomRoutes: Routes = [
    {
        path: 'random',
        children: [
            {
                path: 'buttons',
                component: CssButtonsComponent,
                data: {
                    name: 'CssButtons'
                }
            },
            {
                path: 'forms',
                component: CssFormsComponent,
                data: {
                    name: 'CssForms'
                }
            },
            {
                path: 'shapes',
                component: CssShapesComponent,
                data: {
                    name: 'CssShapes'
                }
            },
            {
                path: 'spinners',
                component: CssSpinnersComponent,
                data: {
                    name: 'CssSpinners'
                }
            }
        ]
    }
];
