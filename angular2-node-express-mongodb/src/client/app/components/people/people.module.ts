import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CommonModule } from '../common/common.module';

import { PersonListPageComponent } from './person-list-page.component';
import { PersonViewPageComponent } from './person-view-page.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        DirectivesModule,
        PipesModule,
        CommonModule
    ],
    declarations: [
        PersonListPageComponent,
        PersonViewPageComponent
    ],
    exports: [],
    providers: []
})
export class PeopleModule { }
