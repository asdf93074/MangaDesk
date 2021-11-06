import store from './store';
import {setCurrentManga} from './actions/index';

window.store = store;
window.addManga = setCurrentManga;
