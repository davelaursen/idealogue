import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../services/user.service';

@Component({
    selector: 'id-idea-form',
    templateUrl: 'app/components/ideas/idea-form.component.html'
})
export class IdeaFormComponent {
    @Input() idea: any;
    @Input() skills: any[];
    @Input() technologies: any[];
    @Input() tags: any[];
    @Input() people: IUser[] = [];
    @Input() showProposers: boolean;
    @Output() addProposer = new EventEmitter<void>();
    @Output() save = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<void>();

    form: FormGroup;
    formSubmitted: boolean;

    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.form = this._formBuilder.group({
            name: ['', Validators.required],
            summary: ['', Validators.required],
            benefits: ['', Validators.required],
            details: ['', Validators.required]
        });
    }

    saveIdea() {
        this.formSubmitted = true;
        if (this.form.valid) {
            this.save.emit(this.idea);
        }
    }

    cancelIdea() {
        this.cancel.emit();
    }

    onAddProposer() {
        this.addProposer.emit();
    }

    onRemoveProposer(proposer: IUser) {
        var index = this.idea.proposers.indexOf(proposer);
        this.idea.proposers.splice(index, 1);
    }
}
