import { ACTION } from './../../constants/actions';
import Manga from '../../models/Manga.model';
import Chapter from '../../models/Chapter.model';


export function setCurrentManga(payload: Manga) {
    return { type: ACTION.SET_CURRENT_MANGA, payload};
};

export function setCurrentChapter(payload: Chapter) {
    return { type: ACTION.SET_CURRENT_CHAPTER, payload};
}