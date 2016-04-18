import {EventEmitter} from 'events';
import AppDispatcher from '../appDispatcher';
import {ActionTypes} from '../constants';
import ideaService from '../services/ideaService';

const IdeaEvents = Object.freeze({
    Create: 'create',
    Update: 'update',
    Delete: 'delete'
});

class IdeaStoreSvc extends EventEmitter {
    constructor(props) {
        super(props);

        AppDispatcher.register(action => {
            switch(action.actionType) {
                case ActionTypes.CREATE_IDEA:
                    this.emit(IdeaEvents.Create, action.idea);
                    break;
                case ActionTypes.UPDATE_IDEA:
                    this.emit(IdeaEvents.Update, action.idea);
                    break;
                case ActionTypes.DELETE_IDEA:
                    this.emit(IdeaEvents.Delete, action.ideaId);
                    break;
            }
        });
    }

    getIdeaList() {
        return ideaService.getList();
    }

    getIdeaById(id) {
        return ideaService.getById(id);
    }

    search(str) {
        return ideaService.search(str);
    }
}

let IdeaStore = new IdeaStoreSvc();
export {IdeaEvents, IdeaStore};
