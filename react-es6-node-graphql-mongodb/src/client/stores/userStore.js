import {EventEmitter} from 'events';
import AppDispatcher from '../appDispatcher';
import {ActionTypes} from '../constants';
import userService from '../services/userService';

const UserEvents = Object.freeze({
    Create: 'create',
    Update: 'update',
    Delete: 'delete'
});

class UserStoreSvc extends EventEmitter {
    constructor(props) {
        super(props);

        AppDispatcher.register(action => {
            switch(action.actionType) {
                case ActionTypes.CREATE_USER:
                    this.emit(UserEvents.Create, action.user);
                    break;
                case ActionTypes.UPDATE_USER:
                    this.emit(UserEvents.Update, action.user);
                    break;
                case ActionTypes.DELETE_USER:
                    this.emit(UserEvents.Delete, action.userId);
                    break;
            }
        });
    }

    getUserList() {
        return userService.getList();
    }

    getUserById(id) {
        return userService.getById(id);
    }

    getUserByUsername(username) {
        return userService.getById(username);
    }

    search(str) {
        return userService.search(str);
    }
}

let UserStore = new UserStoreSvc();
export {UserEvents, UserStore};
