import React from 'react';
import { render, waitFor, screen, fireEvent } from '../../utils/test-utils';
import 'regenerator-runtime';
import '@testing-library/jest-dom';
import { mangaList } from './home.mock';
import MangaCard from './Manga-Card';

test('manga-card is visible', async () => {
	render(<MangaCard manga={mangaList[0]} />);

	await waitFor(() => screen.getByTestId('manga-card'));
	expect(screen.getByTestId('manga-card')).toBeDefined();
});

test('cover image is visible', async () => {
	render(<MangaCard manga={mangaList[0]} />);

	await waitFor(() => screen.getByTestId('manga-card').getElementsByTagName('img'));
	expect(screen.getByTestId('manga-card').getElementsByTagName('img')).toBeDefined();
});

test('title is visible', async () => {
	render(<MangaCard manga={mangaList[0]} />);

	await waitFor(() => screen.getByTestId('manga-card').getElementsByClassName('title')[0]);
	expect(screen.getByTestId('manga-card').getElementsByClassName('title')[0]).toBeDefined();
});

test('description is visible', async () => {
	render(<MangaCard manga={mangaList[0]} />);

	await waitFor(() => screen.getByTestId('manga-card').getElementsByClassName('desc')[0]);
	expect(screen.getByTestId('manga-card').getElementsByClassName('desc')[0]).toBeDefined();
});

test('tags are visible', async () => {
	render(<MangaCard manga={mangaList[0]} />);

	await waitFor(() => screen.getByTestId('manga-card').getElementsByClassName('tags'));
	expect(screen.getByTestId('manga-card').getElementsByClassName('tags')).toBeDefined();
	expect(screen.getByTestId('manga-card').querySelectorAll('.tags div')).toHaveLength(mangaList[0].tags.length);
});

test('clicking on cover image redirects user to manga details page', async () => {
	const routeToCheck = `/manga/${mangaList[0].id}`;

	render(<MangaCard manga={mangaList[0]} />);

	await waitFor(() => screen.getByTestId('manga-card').getElementsByTagName('a')[0]);
	expect(screen.getByTestId('manga-card').getElementsByTagName('a')[0]).toHaveAttribute('href', expect.stringContaining(routeToCheck));
});
