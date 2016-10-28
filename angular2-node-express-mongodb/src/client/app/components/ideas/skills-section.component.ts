import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Util } from '../../blocks/util/util.service';

@Component({
    selector: 'id-skills-section',
    templateUrl: 'app/components/ideas/skills-section.component.html'
})
export class SkillsSectionComponent implements OnInit {
    @Input() skills: string[] = [];
    @Output() skillsChange = new EventEmitter<string[]>();
    @Input() allSkills: string[] = [];

    newSkill: string;
    showNewSkill: boolean;

    constructor(private _util: Util) { }

    ngOnInit() {
        this.newSkill = '';
        this.showNewSkill = false;
    }

    newSkillKeyUp(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            setTimeout(() => {
                this.saveSkill();
            });
        } else if (e.keyCode === 27) {
            this.cancelSkill();
        }
    }

    removeSkill(index: number) {
        this.skills.splice(index, 1);
        this.skillsChange.emit(this.skills);
    }

    saveSkill() {
        if (this._util.isEmpty(this.newSkill)) {
            return;
        }

        let index = this.skills.indexOf(this.newSkill);
        if (index === -1) {
            this.skills.push(this.newSkill);
            this.skillsChange.emit(this.skills);
        }
        this.newSkill = '';
        this.showNewSkill = false;
    }

    cancelSkill() {
        this.showNewSkill = false;
        this.newSkill = '';
    }

    addSkill() {
        this.showNewSkill = true;
    }
}
