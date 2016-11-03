import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'id-list-filter',
    template: `
        <div class="list-filter">
            <input type="text" [(ngModel)]="filter" (ngModelChange)="onChange()" (keyup)="onKeyup($event)" id-autofocus>
        </div>
    `
})
export class ListFilterComponent {
    @Input() filter: string;
    @Output() filterChange = new EventEmitter<string>();
    @Output() close = new EventEmitter<void>();

    onChange() {
        this.filterChange.emit(this.filter);
    }

    onKeyup(e: KeyboardEvent) {
        if (e.keyCode === 27) {
            this.filter = '';
            this.filterChange.emit(this.filter);
            this.close.emit();
        }
    }
}
