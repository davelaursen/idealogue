import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CommonModule } from '../common/common.module';

import { LoginPageComponent } from './login-page.component';
import { SignupPageComponent } from './signup-page.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        PipesModule,
        CommonModule
    ],
    declarations: [
        LoginPageComponent,
        SignupPageComponent
    ],
    exports: [],
    providers: []
})
export class LoginModule { }
