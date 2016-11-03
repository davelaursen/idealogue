import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BaseModule } from './base/base.module';
import { CommonModule } from './common/common.module';
import { AccountModule } from './account/account.module';
import { IdeasModule } from './ideas/ideas.module';
import { LoginModule } from './login/login.module';
import { PeopleModule } from './people/people.module';
import { RandomModule } from './random/random.module';

@NgModule({
    imports: [
        BaseModule,
        CommonModule,
        AccountModule,
        IdeasModule,
        LoginModule,
        PeopleModule,
        RandomModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class ComponentsModule { }
