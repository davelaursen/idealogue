import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Util } from '../../blocks/util/util.service';
import { IIdea, IComment } from '../../services/idea.service';

@Component({
    selector: 'id-idea-details',
    templateUrl: 'app/components/ideas/idea-details.component.html'
})
export class IdeaDetailsComponent {
    @Input() idea: IIdea;
    @Output() ideaChange = new EventEmitter<IIdea>()

    constructor(private _util: Util) { }

    toList(arr: any[], isProposerArr: boolean) {
        if (arr.length === 0) {
            return null;
        }
        if (isProposerArr) {
            arr = arr.map(p => p.firstName + ' ' + p.lastName);
        }
        return this._util.arrayToString(arr);
    }

    onCommentsChange() {
        this.ideaChange.emit(this.idea);
    }
}
