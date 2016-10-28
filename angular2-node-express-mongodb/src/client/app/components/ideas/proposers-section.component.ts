import {Component, Input, Output, EventEmitter} from '@angular/core';
import { IUser } from '../../services/user.service';

@Component({
    selector: 'id-proposers-section',
    templateUrl: 'app/components/ideas/proposers-section.component.html'
})
export class ProposersSectionComponent {
    @Input() proposers: any[];
    @Output() remove = new EventEmitter<IUser>();
    @Output() add = new EventEmitter<void>();

    onRemove(proposer: IUser) {
        this.remove.emit(proposer);
    }

    onAdd() {
        this.add.emit();
    }
}
