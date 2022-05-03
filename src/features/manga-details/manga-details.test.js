import React from 'react';
import { render, waitFor, screen } from '../../utils/test-utils';
import 'regenerator-runtime';
import '@testing-library/jest-dom';
import { mangaList } from '../home/home.mock';
import MangaDetails from './manga-details';

const manga = mangaList[0];

describe('manga-details', () => {
	test('manga-details is visible', async () => {
		render(<MangaDetails manga={manga} />);

		await waitFor(() => screen.getByTestId('manga-details'));
		expect(screen.getByTestId('manga-details')).toBeDefined();
	});

	test('page header is visible and says details', async () => {
		render(<MangaDetails manga={manga} />);

		await waitFor(() => screen.getByText(manga.name));
		expect(screen.getByText(manga.name)).toBeDefined();
	});

	test('title of manga is displayed', async () => {
		render(<MangaDetails manga={manga} />);

		await waitFor(() => screen.getByText(manga.name));
		expect(screen.getByText(manga.name)).toBeDefined();
	});

	test('description of manga is displayed', async () => {
		render(<MangaDetails manga={manga} />);

		await waitFor(() => screen.getByText(manga.description));
		expect(screen.getByText(manga.description)).toBeDefined();
	});
});
