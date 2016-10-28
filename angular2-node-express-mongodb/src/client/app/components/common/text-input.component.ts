import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'id-text-input',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextInputComponent),
            multi: true
        }
    ],
    template: `
        <fieldset class="form-group">
            <label class="form-label" [attr.for]="name">{{label}}</label>
            <input
                [type]="type || 'text'"
                [id]="name"
                [name]="name"
                [class]="'form-element ' + (class || '')"
                [ngClass]="{'has-error': hasErrors}"
                [placeholder]="placeholder || ''"
                [(ngModel)]="value"
                (ngModelChange)="propagateChange($event)"
                [disabled]="disabled"
                [id-autofocus]="autoFocus">
            <span *ngIf="showErrorMessage && errorMessage" class="error-msg-inline">{{errorMessage}}</span>
        </fieldset>
    `
})
export class TextInputComponent implements ControlValueAccessor {
    @Input() name: string;
    @Input() label: string;
    @Input() class: string;
    @Input() value: string;
    @Input() placeholder: string;
    @Input() errors: any;
    @Input() showErrorMessage: boolean;
    @Input() type: string;
    @Input() disabled: boolean;
    @Input() autoFocus: boolean;

    propagateChange = (_: any) => { };
    hasErrors: boolean;
    errorMessage: string;

    ngDoCheck() {
        let keys = Object.keys(this.errors || {});
        this.hasErrors = keys.length > 0;
        this.errorMessage = this.showErrorMessage ? this.errors[keys[0]] : null;
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void { }
}
