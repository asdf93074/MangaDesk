import Manga from '../../models/Manga.model';
import Chapter from '../../models/Chapter.model';
import {ACTION} from '../../constants/actions';

interface State {
  currentManga: Manga;
  currentChapter: Chapter;
}

const initialState: State = {
  currentManga: null,
  currentChapter: null,
};

function rootReducer(state = initialState, action: { type: ACTION; payload: any; }) {
  if (action.type === ACTION.SET_CURRENT_MANGA) {
    return Object.assign({}, state, {
      currentManga: action.payload,
    });
  } else if (action.type === ACTION.SET_CURRENT_CHAPTER) {
    return Object.assign({}, state, {
      currentChapter: action.payload,
    });
  } else if (action.type === ACTION.SET_MFA_OBJECT) {
    return Object.assign({}, state, {
      MFA: action.payload,
    });
  }

  return state;
}

export default rootReducer;
