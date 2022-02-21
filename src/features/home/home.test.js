import React from 'react';
import { render, waitFor, screen } from '../../utils/test-utils';
import Home from './Home';
import 'regenerator-runtime';
import '@testing-library/jest-dom';
import { mangaList } from './home.mock';

test('page title is Manga', async () => {
	render(<Home mangaList={mangaList} />);

	await waitFor(() => screen.getByTestId('feature-header'));
	expect(screen.getByTestId('feature-header')).toHaveTextContent('Manga');
});

test('manga-card is rendering properly', async () => {
	render(<Home mangaList={mangaList} />);

	await waitFor(() => screen.getAllByTestId('manga-card'));
	expect(screen.getAllByTestId('manga-card')).toBeDefined();
});

test('list of mangas is rendering properly', async () => {
	render(<Home mangaList={mangaList} />);

	await waitFor(() => screen.getAllByTestId('manga-card'));
	expect(screen.getAllByTestId('manga-card')).toHaveLength(mangaList.length);
});
