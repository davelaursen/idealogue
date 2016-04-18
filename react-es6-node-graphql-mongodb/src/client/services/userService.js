import {ajax} from 'jquery';
import authService from './authService';

const ALL_FIELDS = `
    _id
    username
    firstName
    lastName
    email
    password
    createdDate
    updatedDate`;

const LIST_FIELDS = `
    _id
    username
    firstName
    lastName
    email`;

class UserService {
    getList() {
        let query = `
        {
            users { ${LIST_FIELDS} }
        }`;
        return this._sendQuery(query)
            .then(res => res.data.users);
    }

    search(str) {
        let query = `
        {
            userSearch(searchStr: "${str}") { ${LIST_FIELDS}, score }
        }`;
        return this._sendQuery(query)
            .then(res => res.data.userSearch);
    }

    getById(id) {
        let query = `
        {
            userById(_id: "${id}") { ${ALL_FIELDS} }
        }`;
        return this._sendQuery(query)
            .then(res => res.data.userById);
    }

    getByUsername(username) {
        let query = `
        {
            userByUsername(username: "${username}") { ${ALL_FIELDS} }
        }`;
        return this._sendQuery(query)
            .then(res => res.data.userByUsername);
    }

    create(user) {
        let query = `
        mutation {
            createUser(user: {
                username: "${user.username}"
                firstName: "${user.firstName}"
                lastName: "${user.lastName}"
                email: "${user.email}"
                password: "${user.password}"
                createdDate: "${user.createdDate}"
                updatedDate: "${user.updatedDate}"
            }) { ${ALL_FIELDS} }
        }`;
        return this._sendQuery(query)
            .then(res => res.data.createUser);
    }

    update(user) {
        let query = `
        mutation {
            updateUser(user: {
                _id: "${user._id}"
                username: "${user.username}"
                firstName: "${user.firstName}"
                lastName: "${user.lastName}"
                email: "${user.email}"
                password: "${user.password}"
                createdDate: "${user.createdDate}"
                updatedDate: "${user.updatedDate}"
            })
        }`;
        return this._sendQuery(query)
            .then(res => res.data.updateUser);
    }

    remove(id) {
        let query = `
        mutation {
            deleteUser(_id: "${id}")
        }`;
        return this._sendQuery(query)
            .then(res => res.data.deleteUser);
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

export default new UserService;
