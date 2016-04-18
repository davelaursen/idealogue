import {ajax} from 'jquery';
import authService from './authService';

const ALL_FIELDS = `
    _id
    name
    summary
    benefits
    details
    proposers {
        _id
        firstName
        lastName
    }
    tags
    skills
    technologies
    votes
    comments {
        userId
        firstName
        lastName
        text
        timestamp
    }
    createdDate
    updatedDate`;

const LIST_FIELDS = `
    _id
    name
    summary
    tags
    skills
    technologies
    votes`;

class IdeaService {
    getList() {
        let query = `
        {
            ideas { ${LIST_FIELDS} }
        }`;
        return this._sendQuery(query)
            .then(res => res.data.ideas);
    }

    search(str) {
        let query = `
        {
            ideaSearch(searchStr: "${str}") { ${LIST_FIELDS}, score }
        }`;
        return this._sendQuery(query)
            .then(res => res.data.ideaSearch);
    }

    getById(id) {
        let query = `
        {
            ideaById(_id: "${id}") { ${ALL_FIELDS} }
        }`;
        return this._sendQuery(query)
            .then(res => res.data.ideaById);
    }

    create(idea) {
        let query = `
        mutation {
            createIdea(idea: {
                name: "${idea.name}"
                summary: ${JSON.stringify(idea.summary)}
                benefits: ${JSON.stringify(idea.benefits)}
                details: ${JSON.stringify(idea.details)}
                proposers: ${JSON.stringify(idea.proposers.map(p => p._id))}
                tags: ${JSON.stringify(idea.tags)}
                skills: ${JSON.stringify(idea.skills)}
                technologies: ${JSON.stringify(idea.technologies)}
                votes: ${JSON.stringify(idea.votes)}
                comments: ${this._stringifyComments(idea.comments)}
                createdDate: "${idea.createdDate}"
                updatedDate: "${idea.updatedDate}"
            }) { ${ALL_FIELDS} }
        }`;
        return this._sendQuery(query)
            .then(res => res.data.createIdea);
    }

    update(idea) {
        let query = `
        mutation {
            updateIdea(idea: {
                _id: "${idea._id}"
                name: "${idea.name}"
                summary: ${JSON.stringify(idea.summary)}
                benefits: ${JSON.stringify(idea.benefits)}
                details: ${JSON.stringify(idea.details)}
                proposers: ${JSON.stringify(idea.proposers.map(p => p._id))}
                tags: ${JSON.stringify(idea.tags)}
                skills: ${JSON.stringify(idea.skills)}
                technologies: ${JSON.stringify(idea.technologies)}
                votes: ${JSON.stringify(idea.votes)}
                comments: ${this._stringifyComments(idea.comments)}
                createdDate: "${idea.createdDate}"
                updatedDate: "${idea.updatedDate}"
            })
        }`;
        return this._sendQuery(query)
            .then(res => res.data.updateIdea);
    }

    remove(id) {
        let query = `
        mutation {
            deleteIdea(_id: "${id}")
        }`;
        return this._sendQuery(query)
            .then(res => res.data.deleteIdea);
    }

    _stringifyComments(comments) {
        let str = '[';
        for (let c of comments) {
            str += `{userId: "${c.userId}", text: ${JSON.stringify(c.text)}, timestamp: "${c.timestamp}"},`;
        }
        return str.replace(/,$/, '') + ']';
    }

    _sendQuery(query) {
        let token = authService.getToken() || '';
        return ajax({
            url: '/api/graphql',
            type: 'post',
            data: {query: query},
            headers: { 'x-access-token': token }
        }).then(
            (res) => res,
            (xhr) => {
                if (xhr.status === 401) {
                    authService.logout();
                    location.href = '/login';
                }
                return xhr;
            }
        );
    }
}

export default new IdeaService;
