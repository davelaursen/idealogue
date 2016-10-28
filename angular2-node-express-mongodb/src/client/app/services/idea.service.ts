import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { DataService } from '../blocks/data/data.service';
import { Util } from '../blocks/util/util.service';
import { AuthService } from './auth.service';
import { IUser } from './user.service';

export interface IIdea {
    _id?: string
    name: string
    summary: string
    benefits: string
    details: string
    proposers: any[]
    tags: string[]
    skills: string[]
    technologies: string[]
    votes: string[]
    comments: IComment[]
    createdDate: string
    updatedDate: string
}

export interface IComment {
    userId: string
    person?: IUser
    text: string
    timestamp: string
}

@Injectable()
export class IdeaService {
    constructor(
        private _dataService: DataService,
        private _util: Util,
        private _authService: AuthService
    ) { }

    getAll(people: IUser[]): Promise<IIdea[]> {
        return this._dataService.get('/api/ideas', this._getHeaders())
            .then((res: Response) => {
                let ideas = <IIdea[]>res.json();
                return ideas.map(i => this._convertForView(i, people));
            });
    }

    getById(userId: string, people: IUser[]): Promise<IIdea> {
        return this._dataService.get('/api/ideas/' + userId, this._getHeaders())
            .then((res: Response) => this._convertForView(res.json(), people));
    }

    search(searchStr: string): Promise<any[]> {
        return this._dataService.get('/api/ideas?search=' + searchStr, this._getHeaders())
            .then((res: Response) => res.json());
    }

    insert(idea: IIdea): Promise<IIdea> {
        return this._dataService.post('/api/ideas', this._convertForSave(idea), this._getHeaders())
            .then((res: Response) => {
                idea._id = res.json()._id;
                return idea;
            });
    }

    update(idea: IIdea): Promise<boolean> {
        var dateStr = this._util.getISO8601DateString();
        idea.updatedDate = dateStr;
        return this._dataService.put('/api/ideas/' + idea._id, this._convertForSave(idea), this._getHeaders())
            .then((res: Response) => res.status === 204);
    }

    remove(id: string): Promise<boolean> {
        return this._dataService.del('/api/ideas/' + id, this._getHeaders())
            .then((res: Response) => res.status == 204);
    }

    newIdea(): IIdea {
        var dateStr = this._util.getISO8601DateString();
        return {
            name: "",
            summary: "",
            benefits: "",
            details: "",
            proposers: [],
            tags: [],
            skills: [],
            technologies: [],
            votes: [],
            comments: [],
            createdDate: dateStr,
            updatedDate: dateStr
        };
    }

    private _convertForSave(idea: IIdea): IIdea {
        let clone = this._util.clone(idea);
        clone.proposers = clone.proposers.map((p: IUser) => p._id);
        clone.comments = clone.comments.map((c: IComment) => {
            return {
                userId: c.userId,
                text: c.text,
                timestamp: c.timestamp
            };
        });
        return clone;
    }

    private _convertForView(idea: IIdea, people: IUser[]): IIdea {
        let clone = this._util.clone(idea);
        clone.proposers = clone.proposers.map((id: string) => {
            return people.find(p => p._id === id) || null;
        });
        clone.comments = clone.comments.map((c: IComment) => {
            c.person = people.find(p => p._id === c.userId) || null;
            return c;
        });
        return clone;
    }

    private _getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', this._authService.getToken());
        return headers;
    }
}
