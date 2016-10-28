import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '../common/common.module';

import { NotFoundComponent } from './not-found.component';
import { ShellComponent } from './shell.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        CommonModule
    ],
    declarations: [
        NotFoundComponent,
        ShellComponent
    ],
    providers: []
})
export class BaseModule { }
