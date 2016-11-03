import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'id-text-area',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextAreaComponent),
            multi: true
        }
    ],
    template: `
        <fieldset class="form-group">
            <label class="form-label" [attr.for]="name">{{label}}</label>
            <textarea
                [id]="name"
                [name]="name"
                [class]="'form-element ' + (class || '')"
                [ngClass]="{'has-error': hasErrors}"
                [placeholder]="placeholder || ''"
                [(ngModel)]="value"
                (ngModelChange)="propagateChange($event)"
                [disabled]="disabled"
                [id-autofocus]="autoFocus"
                [id-autosize]="autoSize">
            </textarea>
        </fieldset>
    `
})
export class TextAreaComponent implements ControlValueAccessor {
    @Input() name: string;
    @Input() label: string;
    @Input() class: string;
    @Input() placeholder: string;
    @Input() value: string;
    @Input() errors: any;
    @Input() autoSize: boolean = false;
    @Input() disabled: boolean = false;
    @Input() autoFocus: boolean = false

    propagateChange = (_: any) => { };
    hasErrors: boolean;
    errorMessage: string;

    ngDoCheck() {
        let keys = Object.keys(this.errors || {});
        this.hasErrors = keys.length > 0;
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void { }
}
