import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Util } from '../../blocks/util/util.service';
import { AuthService } from '../../services/auth.service';
import { IdeaService, IIdea } from '../../services/idea.service';
import { UserService, IUser } from '../../services/user.service';

@Component({
    templateUrl: 'app/components/ideas/idea-view-page.component.html'
})
export class IdeaViewPageComponent implements OnInit {
    private _currentUser: IUser;

    idea: IIdea;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _util: Util,
        private _ideaService: IdeaService,
        private _userService: UserService,
        authService: AuthService
    ) {
        this._currentUser = authService.getCurrentUser();
    }

    ngOnInit() {
        this.idea = null;

        this._userService.getAll()
            .then(users => {
                this._ideaService.getById(this._route.snapshot.params['id'], users)
                    .then(idea => this.idea = idea);
            });
    }

    vote(event: Event) {
        event.preventDefault();
        let id = this._currentUser._id;
        let found = this.idea.votes.find(v => v === id);
        if (!found) {
            this.idea.votes.push(id);
            this._ideaService.update(this.idea);
        }
    }

    remove(event: Event) {
        event.preventDefault();
        this._ideaService.remove(this.idea._id)
            .then(success => {
                if (success) {
                    this._router.navigate(['/ideas']);
                }
            });
    }

    onIdeaChange() {
        this._ideaService.update(this.idea);
    }
}
