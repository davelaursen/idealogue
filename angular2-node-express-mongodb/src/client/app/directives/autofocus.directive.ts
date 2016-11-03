import {Directive, AfterViewInit, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[id-autofocus]',
})
export class AutofocusDirective implements AfterViewInit {
    @Input('id-autofocus') enabled: boolean|string;

    constructor(private _element: ElementRef) { }

    ngAfterViewInit() {
        if (this.enabled === true || this.enabled === '') {
            this._element.nativeElement.focus();
        }
    }
}
