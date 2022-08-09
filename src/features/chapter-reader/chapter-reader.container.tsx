import { MangaDexAPI } from 'api/extensions/mangadex/mangadex.api';
import { useApi } from 'api/hooks/useApi';
import { usePreloadImages } from 'hooks/useImagePreload';
import { useSettings } from 'hooks/useSettings';
import React, { useEffect, useState } from 'react';
import ChapterReader from './chapter-reader';

function ChapterReaderContainer(props: any) {
	const id: string = props.match.params.id;

	const api = useSettings('API') as MangaDexAPI;
	const [pageNumber, setPageNumber] = useState(parseInt(props.match.params.pageNumber));
  const readChapterApi = useApi(() => api.readChapter(id));
  usePreloadImages(readChapterApi.data || []);

	const handleKeyPress = (event: any) => {
		if (event.key === 'ArrowRight') {
			if (pageNumber < readChapterApi.data.length - 1) {
				setPageNumber(pageNumber + 1);
			}
		}

		if (event.key === 'ArrowLeft') {
			if (pageNumber > 0) {
				setPageNumber(pageNumber - 1);
			}
		}
	};

	useEffect(() => {
		focus();
    readChapterApi.request();
	}, []);

	return (
		<div tabIndex={1} className="reader-container" onKeyDown={handleKeyPress}>
			<ChapterReader page={readChapterApi.data?.length > 0 ? readChapterApi.data[pageNumber] : null}></ChapterReader>
		</div>
	);
}

export default ChapterReaderContainer;
