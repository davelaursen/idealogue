import appDispatcher from '../appDispatcher';
import {ActionTypes} from '../constants';
import ideaService from '../services/ideaService';
import util from '../utilities/util';

let ideaActions = {
    createIdea(idea) {
        let now = util.getISO8601DateString();
        idea.updatedDate = now;
        idea.createdDate = now;
        ideaService.create(idea)
            .done(newIdea => {
                appDispatcher.dispatch({
                    actionType: ActionTypes.CREATE_IDEA,
                    idea: newIdea
                });
            });
    },
    updateIdea(idea) {
        idea.updatedDate = util.getISO8601DateString();
        ideaService.update(idea)
            .done(() => {
                appDispatcher.dispatch({
                    actionType: ActionTypes.UPDATE_IDEA,
                    idea: idea
                });
            });
    },
    deleteIdea(ideaId) {
        ideaService.remove(ideaId)
            .done(() => {
                appDispatcher.dispatch({
                    actionType: ActionTypes.DELETE_IDEA,
                    ideaId: ideaId
                });
            });
    }
};

export default ideaActions;
