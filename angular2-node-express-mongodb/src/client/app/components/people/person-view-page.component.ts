import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    templateUrl: 'app/components/people/person-view-page.component.html'
})
export class PersonViewPageComponent implements OnInit {
    user: any;

    constructor(
        private _route: ActivatedRoute,
        private _userService: UserService
    ) { }

    ngOnInit() {
        this.user = {};

        let id = this._route.snapshot.params['id'];
        this._userService.getById(id)
            .then(user => this.user = user);
    }
}
