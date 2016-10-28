import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../blocks/data/data.service';
import { StorageService } from '../blocks/storage/storage.service';
import { Util } from '../blocks/util/util.service';

@Injectable()
export class AuthService {
    private _currentUserBus: Subject<any>;

    constructor(
        private _dataService: DataService,
        private _storageService: StorageService,
        private _util: Util
    ) {
        this._currentUserBus = new Subject<any>();
    }

    getCurrentUser(): any {
        return this._storageService.session.getItem('currentUser');
    }

    getToken(): string {
        let user = this.getCurrentUser();
        return user ? user.token : null;
    }

    login(username: string, password: string): Promise<any> {
        let payload = {username: username, password: password};
        return this._dataService.post('/auth/login', payload)
            .then((res: Response) => {
                let data = res.json();
                if (data.success) {
                    let user = data.user;
                    user.token = data.token;
                    this._setCurrentUser(user);
                    return user;
                }
                return null;
            });
    }

    logout(): void {
        this._setCurrentUser(null);
    }

    onCurrentUserChanged(): Observable<any> {
        return this._currentUserBus.asObservable();
    }

    signup(user: any): Promise<any> {
        return this._dataService.post('/auth/signup', user)
            .then((res: Response) => {
                let data = res.json();
                if (data.success) {
                    return '';
                } else {
                    return data.message;
                }
            });
    }

    updateUser(user: any): Promise<boolean> {
        let currentUser = this.getCurrentUser();
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', currentUser.token);

        return this._dataService.put('/api/users/' + user._id, user, headers)
            .then((res: Response) => {
                if (res.status === 204) {
                    user.token = currentUser.token;
                    this._setCurrentUser(user);
                    return true;
                }
                return false;
            });
    }

    private _setCurrentUser(user: any): void {
        if (this._util.isDefined(user)) {
            this._storageService.session.setItem('currentUser', user);
        } else {
            this._storageService.session.removeItem('currentUser');
        }
        this._currentUserBus.next(user);
    }
}
