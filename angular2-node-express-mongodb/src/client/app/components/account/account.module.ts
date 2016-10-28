import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CommonModule } from '../common/common.module';

import { AccountEditPageComponent } from './account-edit-page.component';
import { AccountPasswordPageComponent } from './account-password-page.component';
import { AccountViewPageComponent } from './account-view-page.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        DirectivesModule,
        PipesModule,
        CommonModule
    ],
    declarations: [
        AccountEditPageComponent,
        AccountPasswordPageComponent,
        AccountViewPageComponent
    ],
    exports: [],
    providers: []
})
export class AccountModule { }
