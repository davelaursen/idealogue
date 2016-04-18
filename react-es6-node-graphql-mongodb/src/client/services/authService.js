import {post} from 'jquery';

class AuthService {
    login(username, password) {
        return post('/auth/login', {username: username, password: password})
            .then(res => {
                if (res.success) {
                    let userObj = res.user;
                    userObj.token = res.token;
                    sessionStorage.setItem('currentUser', JSON.stringify(userObj));
                    return userObj;
                }
            });
    }

    logout() {
        sessionStorage.removeItem('currentUser');
    }

    signup(user) {
        return post('/auth/signup', user)
            .then(res => {
                if (res.success) {
                    return '';
                } else {
                    return res.message;
                }
            });
    }

    getCurrentUser() {
        let userStr = sessionStorage.getItem('currentUser');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }

    getToken() {
        let userObj = this.getCurrentUser();
        if (userObj) {
            return userObj.token;
        }
        return null;
    }
}

export default new AuthService();
