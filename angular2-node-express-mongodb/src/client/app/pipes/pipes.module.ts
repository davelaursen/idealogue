import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';

import { DateFormatterPipe } from './date-formatter.pipe';
import { DateTimeFormatterPipe } from './date-time-formatter.pipe';
import { IdeaFilterPipe } from './idea-filter.pipe';
import { UserFilterPipe } from './user-filter.pipe';

@NgModule({
    imports: [
        // BrowserModule,
        // FormsModule
    ],
    declarations: [
        DateFormatterPipe,
        DateTimeFormatterPipe,
        IdeaFilterPipe,
        UserFilterPipe
    ],
    exports: [
        DateFormatterPipe,
        DateTimeFormatterPipe,
        IdeaFilterPipe,
        UserFilterPipe
    ],
    providers: []
})
export class PipesModule { }
