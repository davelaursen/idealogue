import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { DataService } from '../blocks/data/data.service';
import { AuthService } from './auth.service';

@Injectable()
export class SkillService {
    constructor(
        private _dataService: DataService,
        private _authService: AuthService) {
    }

    getAll(): Promise<any> {
        return this._dataService.get('/api/skills', this._getHeaders())
            .then((res: Response) => res.json());
    }

    private _getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', this._authService.getToken());
        return headers;
    }
}
