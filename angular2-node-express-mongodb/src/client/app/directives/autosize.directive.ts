import {Directive, DoCheck, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[id-autosize]',
})
export class AutosizeDirective implements DoCheck {
    @Input('id-autosize') enabled: boolean|string;

    constructor(private _element: ElementRef) { }

    ngDoCheck() {
        console.log(this.enabled);
        if (this.enabled === true || this.enabled === '') {
            let element: HTMLElement = this._element.nativeElement;
            if (element.scrollHeight < 1) {
                return;
            }
            while (element.clientHeight >= element.scrollHeight) {
                element.style.height =
                    parseInt(getComputedStyle(element).getPropertyValue('height'), 10) - 1 + "px";
            }
            while (element.clientHeight < element.scrollHeight) {
                element.style.height =
                    parseInt(getComputedStyle(element).getPropertyValue('height'), 10) + 1 + "px";
            }
        }
    }
}
