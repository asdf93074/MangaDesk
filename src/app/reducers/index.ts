import Manga from '../../models/Manga.model';
import { ACTION } from '../actions/index';

interface State {
    currentManga: Manga
}

const initialState: State = {
    currentManga: null
};

function rootReducer(state = initialState, action: { type: ACTION; payload: any; }) {
    if (action.type === ACTION.SET_CURRENT_MANGA) {
        return Object.assign({}, state, {
            currentManga: action.payload
        });
    }

    return state;
}

export default rootReducer;