import {EventEmitter} from 'events';
import AppDispatcher from '../appDispatcher';
import {ActionTypes} from '../constants';
import authService from '../services/authService';

const AuthEvents = Object.freeze({
    Login: 'login',
    Logout: 'logout',
    Signup: 'signup'
});

class AuthStoreSvc extends EventEmitter {
    constructor(props) {
        super(props);

        AppDispatcher.register(action => {
            switch(action.actionType) {
                case ActionTypes.LOGIN:
                    this.emit(AuthEvents.Login, action.currentUser);
                    break;
                case ActionTypes.LOGOUT:
                    this.emit(AuthEvents.Logout);
                    break;
                case ActionTypes.SIGNUP:
                    this.emit(AuthEvents.Signup, action.message);
                    break;
            }
        });
    }

    getCurrentUser() {
        return authService.getCurrentUser();
    }

    isLoggedIn() {
        return !!this.getCurrentUser();
    }
}

let AuthStore = new AuthStoreSvc();
export {AuthEvents, AuthStore};
