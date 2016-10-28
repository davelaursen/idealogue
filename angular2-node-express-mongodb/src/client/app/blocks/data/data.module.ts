import '../../rxjs-extensions';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { DataService } from './data.service';

@NgModule({
    imports: [
        HttpModule
    ],
    declarations: [],
    providers: [
        DataService
    ]
})
export class DataModule { }
