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
	limit: 30,
	loadingNextPage: false,
};

const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
		clear(state) {
			state.mangas = [];
		},
		incrementOffset(state, incrementBy) {
			state.loadingNextPage = true;
			state.offset = state.offset + incrementBy.payload;
		},
	},
});

export const { clear, incrementOffset } = homeSlice.actions;
export default homeSlice.reducer;
