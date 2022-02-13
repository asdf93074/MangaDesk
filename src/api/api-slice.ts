import { createSlice } from '@reduxjs/toolkit';
import { MangaAPI } from './api.interface';
import { MangaDexAPI } from './extensions/mangadex.api';

interface APIState {
	api: MangaAPI,
}

const initialState: APIState = {
	api: new MangaDexAPI(),
};

const apiSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
		change(state, api) {
			state.api = api.payload;
		},
	},
});

export const { change } = apiSlice.actions;
export default apiSlice.reducer;
