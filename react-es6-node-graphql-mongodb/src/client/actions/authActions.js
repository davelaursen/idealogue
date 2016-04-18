import appDispatcher from '../appDispatcher';
import {ActionTypes} from '../constants';
import authService from '../services/authService';
import util from '../utilities/util';

let userActions = {
    login(username, password) {
        authService.login(username, password)
            .done(currentUser => {
                appDispatcher.dispatch({
                    actionType: ActionTypes.LOGIN,
                    currentUser: currentUser
                });
            });
    },

    logout() {
        authService.logout();
        appDispatcher.dispatch({
            actionType: ActionTypes.LOGOUT
        });
    },

    signup(user) {
        let now = util.getISO8601DateString();
        user.updatedDate = now;
        user.createdDate = now;
        authService.signup(user)
            .done(message => {
                appDispatcher.dispatch({
                    actionType: ActionTypes.SIGNUP,
                    message: message
                });
            });
    }
};

export default userActions;
