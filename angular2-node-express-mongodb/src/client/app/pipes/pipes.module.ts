import { NgModule } from '@angular/core';

import { DateFormatterPipe } from './date-formatter.pipe';
import { DateTimeFormatterPipe } from './date-time-formatter.pipe';
import { IdeaFilterPipe } from './idea-filter.pipe';
import { TextFormatterPipe } from './text-formatter.pipe';
import { UserFilterPipe } from './user-filter.pipe';

@NgModule({
    imports: [],
    declarations: [
        DateFormatterPipe,
        DateTimeFormatterPipe,
        IdeaFilterPipe,
        TextFormatterPipe,
        UserFilterPipe
    ],
    exports: [
        DateFormatterPipe,
        DateTimeFormatterPipe,
        IdeaFilterPipe,
        TextFormatterPipe,
        UserFilterPipe
    ],
    providers: []
})
export class PipesModule { }
