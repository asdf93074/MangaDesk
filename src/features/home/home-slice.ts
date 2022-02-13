import { createSlice } from '@reduxjs/toolkit';
import { Manga } from 'models/manga';

interface HomeState {
	mangas: Manga[],
	offset: number,
	limit: number,
	loadingNextPage: boolean,
}

const initialState: HomeState = {
	mangas: [],
	offset: 0,
	limit: 100,
	loadingNextPage: false,
};

const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
		clear(state) {
			state.mangas = [];
		},
		nextPage(state) {
			state.loadingNextPage = true;
			state.offset++;
		},
	},
});

export const { clear, nextPage } = homeSlice.actions;
export default homeSlice.reducer;
