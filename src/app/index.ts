import store from './store';
import {setCurrentManga} from './actions/index';

(window as any).store = store;
(window as any).addManga = setCurrentManga;
