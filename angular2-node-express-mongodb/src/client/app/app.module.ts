import { NgModule, ErrorHandler } from '@angular/core';
import { Response } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BlocksModule } from './blocks/blocks.module';
import { DirectivesModule } from './directives/directives.module';
import { ServicesModule } from './services/services.module';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { routing } from './app.routing';

import { LOGGER_CONFIG_TOKEN } from './blocks/logger/logger.service';
import { STORAGE_CONFIG_TOKEN } from './blocks/storage/storage.service';
import { ILoggerConfig, LogLevel } from './blocks/logger/logger.service';
import { IStorageConfig } from './blocks/storage/storage.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        BlocksModule,
        DirectivesModule,
        ServicesModule,
        ComponentsModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {
            provide: LOGGER_CONFIG_TOKEN,
            useValue: {
                logLevel: LogLevel.Info,
                logToConsole: true
            }
        },
        {
            provide: STORAGE_CONFIG_TOKEN,
            useValue: {}
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
