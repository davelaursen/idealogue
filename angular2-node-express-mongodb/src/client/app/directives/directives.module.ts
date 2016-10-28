import { NgModule } from '@angular/core';

import { AutofocusDirective } from './autofocus.directive';
import { AutosizeDirective } from './autosize.directive';

@NgModule({
    imports: [],
    declarations: [
        AutofocusDirective,
        AutosizeDirective
    ],
    exports: [
        AutofocusDirective,
        AutosizeDirective
    ],
    providers: []
})
export class DirectivesModule { }
