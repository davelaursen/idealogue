import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Util } from '../../blocks/util/util.service';

@Component({
    selector: 'id-technologies-section',
    templateUrl: 'app/components/ideas/technologies-section.component.html'
})
export class TechnologiesSectionComponent implements OnInit {
    @Input() technologies: string[] = [];
    @Output() technologiesChange = new EventEmitter<string[]>();
    @Input() allTechnologies: string[] = [];

    newTechnology: string;
    showNewTechnology: boolean;

    constructor(private _util: Util) { }

    ngOnInit() {
        this.newTechnology = '';
        this.showNewTechnology = false;
    }

    newTechnologyKeyUp(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            setTimeout(() => {
                this.saveTechnology();
            });
        } else if (e.keyCode === 27) {
            this.cancelTechnology();
        }
    }

    removeTechnology(index: number) {
        this.technologies.splice(index, 1);
        this.technologiesChange.emit(this.technologies);
    }

    saveTechnology() {
        if (this._util.isEmpty(this.newTechnology)) {
            return;
        }

        let index = this.technologies.indexOf(this.newTechnology);
        if (index === -1) {
            this.technologies.push(this.newTechnology);
            this.technologiesChange.emit(this.technologies);
        }
        this.newTechnology = '';
        this.showNewTechnology = false;
    }

    cancelTechnology() {
        this.showNewTechnology = false;
        this.newTechnology = '';
    }

    addTechnology() {
        this.showNewTechnology = true;
    }
}
