import { configureStore } from '@reduxjs/toolkit';
import apiReducer from 'api/api-slice';
import homeReducer from '../features/home/home-slice';

export const store = configureStore({
	reducer: {
		home: homeReducer,
		api: apiReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
