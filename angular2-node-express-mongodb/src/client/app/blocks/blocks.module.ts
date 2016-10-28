import '../rxjs-extensions';

import { NgModule } from '@angular/core';

import { DataModule } from './data/data.module';
import { LoggerModule } from './logger/logger.module';
import { StorageModule } from './storage/storage.module';
import { UtilModule } from './util/util.module';

@NgModule({
    imports: [
        DataModule,
        LoggerModule,
        StorageModule,
        UtilModule
    ],
    declarations: [],
    providers: []
})
export class BlocksModule { }
