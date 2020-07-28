import Manga from '../../models/Manga.model';

interface State {
    currentManga: Manga
}

const initialState: State = {
    currentManga: null
};

function rootReducer(state = initialState, action: { type: string; payload: any; }) {
    if (action.type === 'SET_CURRENT_MANGA') {
        return Object.assign({}, state, {
            currentManga: action.payload
        });
    }

    return state;
}

export default rootReducer;