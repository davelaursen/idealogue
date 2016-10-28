import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { DataService } from '../blocks/data/data.service';
import { AuthService } from './auth.service';

export interface IUser {
    _id?: string
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
}

@Injectable()
export class UserService {
    constructor(
        private _dataService: DataService,
        private _authService: AuthService,
    ) { }

    getAll(): Promise<IUser[]> {
        return this._dataService.get('/api/users', this._getHeaders())
            .then((res: Response) => res.json());
    }

    getById(id: string): Promise<IUser> {
        return this._dataService.get('/api/users/' + id, this._getHeaders())
            .then((res: Response) => res.json());
    }

    search(searchStr: string): Promise<any[]> {
        return this._dataService.get('/api/users?search=' + searchStr, this._getHeaders())
            .then((res: Response) => res.json());
    }

    remove(id: string): Promise<boolean> {
        return this._dataService.del('/api/users/' + id, this._getHeaders())
            .then((res: Response) => res.status === 204);
    }

    private _getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', this._authService.getToken());
        return headers;
    }
}
