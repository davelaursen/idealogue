import {Component, Input} from '@angular/core';

@Component({
    selector: 'id-view-field',
    template: `
        <div class='view-group'>
            <div class="view-label">{{label}}</div>
            <div [class]="'view-element ' + (class || '')">{{value === null || value === undefined ? '&nbsp;' : value}}</div>
        </div>
    `
})
export class ViewFieldComponent {
    @Input() label: string;
    @Input() value: string;
    @Input() class: string;
}
