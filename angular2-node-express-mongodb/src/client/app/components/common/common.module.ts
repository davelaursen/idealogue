import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';

import { HeaderComponent } from './header.component';
import { ListFilterComponent } from './list-filter.component';
import { PersonSearchComponent } from './person-search.component';
import { SiteSearchComponent } from './site-search.component';
import { SpinnerComponent } from './spinner.component';
import { TextAreaComponent } from './text-area.component';
import { TextInputComponent } from './text-input.component';
import { ViewFieldComponent } from './view-field.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        DirectivesModule,
        PipesModule
    ],
    declarations: [
        HeaderComponent,
        ListFilterComponent,
        PersonSearchComponent,
        SiteSearchComponent,
        SpinnerComponent,
        TextAreaComponent,
        TextInputComponent,
        ViewFieldComponent
    ],
    exports: [
        HeaderComponent,
        ListFilterComponent,
        PersonSearchComponent,
        SiteSearchComponent,
        SpinnerComponent,
        TextAreaComponent,
        TextInputComponent,
        ViewFieldComponent
    ],
    providers: []
})
export class CommonModule { }
