import React from 'react';
import { render, waitFor, screen, waitForElementToBeRemoved } from '../../utils/test-utils';
import 'regenerator-runtime';
import ChapterReader from './chapter-reader'
import '@testing-library/jest-dom';

test('arrows are visible when page has loaded', async () => {
    render(<ChapterReader page='https://uploads.mangadex.org/data/3c5aefb5203d3d1e592eaad0dc3a276e/7-f45ee5eda0512bb172ec87578903a25b4215f609c811c1fe2ada4b63ff10800c.jpg'
        onRightArrowClick={() => { }}
        onLeftArrowClick={() => { }}
    />);

    await waitFor(()=> expect(screen.getByTestId('manga-spinner')).not.toBeDefined(), {timeout:20000});
    expect(screen.getByTestId('arrow-left')).toBeDefined();
});

// test('arrows are not visible when page is loading', async () => {
//     render(<ChapterReader page='https://uploads.mangadex.org/data/3c5aefb5203d3d1e592eaad0dc3a276e/7-f45ee5eda0512bb172ec87578903a25b4215f609c811c1fe2ada4b63ff10800c.jpg'
//         onRightArrowClick={() => { }}
//         onLeftArrowClick={() => { }}
//     />);

//     await waitFor(() => screen.getByTestId('manga-spinner'));
//     expect(screen.getByTestId('arrow-left')).not.toBeInTheDocument();
// });
