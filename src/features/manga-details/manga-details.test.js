import React from 'react';
import { render, waitFor, screen } from '../../utils/test-utils';
import 'regenerator-runtime';
import '@testing-library/jest-dom';
import { mangaList } from '../home/home.mock';
import MangaDetails from './manga-details';

test('manga-details is visible', async () => {
	render(<MangaDetails manga={mangaList[0]} />);

	await waitFor(() => screen.getByTestId('manga-details'));
	expect(screen.getByTestId('manga-details')).toBeDefined();
});