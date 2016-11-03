import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { CssButtonsComponent } from './css-buttons.component';
import { CssFormsComponent } from './css-forms.component';
import { CssShapesComponent } from './css-shapes.component';
import { CssSpinnersComponent } from './css-spinners.component';


@NgModule({
    imports: [
        BrowserModule,
        RouterModule
    ],
    declarations: [
        CssButtonsComponent,
        CssFormsComponent,
        CssShapesComponent,
        CssSpinnersComponent
    ],
    exports: [],
    providers: []
})
export class RandomModule { }
