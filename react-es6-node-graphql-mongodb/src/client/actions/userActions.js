import appDispatcher from '../appDispatcher';
import {ActionTypes} from '../constants';
import userService from '../services/userService';
import util from '../utilities/util';

let userActions = {
    createUser(user) {
        let now = util.getISO8601DateString();
        user.updatedDate = now;
        user.createdDate = now;
        userService.create(user)
            .done(newUser => {
                appDispatcher.dispatch({
                    actionType: ActionTypes.CREATE_USER,
                    user: newUser
                });
            });
    },
    updateUser(user) {
        user.updatedDate = util.getISO8601DateString();
        userService.update(user)
            .done(() => {
                appDispatcher.dispatch({
                    actionType: ActionTypes.UPDATE_USER,
                    user: user
                });
            });
    },
    deleteUser(userId) {
        userService.remove(userId)
            .done(() => {
                appDispatcher.dispatch({
                    actionType: ActionTypes.DELETE_USER,
                    userId: userId
                });
            });
    }
};

export default userActions;
