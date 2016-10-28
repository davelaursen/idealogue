import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Util } from '../../blocks/util/util.service';

@Component({
    selector: 'id-tags-section',
    templateUrl: 'app/components/ideas/tags-section.component.html'
})
export class TagsSectionComponent implements OnInit {
    @Input() tags: string[] = [];
    @Output() tagsChange = new EventEmitter<string[]>();
    @Input() allTags: string[] = [];

    newTag: string;
    showNewTag: boolean;

    constructor(private _util: Util) { }

    ngOnInit() {
        this.newTag = '';
        this.showNewTag = false;
    }

    newTagKeyUp(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            setTimeout(() => {
                this.saveTag();
            });
        } else if (e.keyCode === 27) {
            this.cancelTag();
        }
    }

    removeTag(index: number) {
        this.tags.splice(index, 1);
        this.tagsChange.emit(this.tags);
    }

    saveTag() {
        if (this._util.isEmpty(this.newTag)) {
            return;
        }

        let index = this.tags.indexOf(this.newTag);
        if (index === -1) {
            this.tags.push(this.newTag);
            this.tagsChange.emit(this.tags);
        }
        this.newTag = '';
        this.showNewTag = false;
    }

    cancelTag() {
        this.showNewTag = false;
        this.newTag = '';
    }

    addTag() {
        this.showNewTag = true;
    }
}
