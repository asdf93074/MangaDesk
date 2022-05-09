import { useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import ChapterReader from './chapter-reader';

enum ARROW_DIRECTION {
	RIGHT,
	LEFT,
}

function ChapterReaderContainer(props: any) {
	const { api } = useAppSelector((state) => state.api);
	const [pages, setPages] = useState([]);
	const [pageNumber, setPageNumber] = useState(parseInt(props.match.params.pageNumber));
	const id: string = props.match.params.id;

	const handleKeyPress = (event: any) => {
		if (event.key === 'ArrowRight') {
			if (pageNumber < pages.length - 1) {
				setPageNumber(pageNumber + 1);
			}
		}

		if (event.key === 'ArrowLeft') {
			if (pageNumber > 0) {
				setPageNumber(pageNumber - 1);

			}
		}
	};

	const handleArrow = (arrowDirection: ARROW_DIRECTION) => {
		setPageNumber(pageNumber - 1);
		if (arrowDirection === ARROW_DIRECTION.RIGHT) {
			if (pageNumber < pages.length - 1) {
				setPageNumber(pageNumber + 1);
			}
		}
		if (arrowDirection === ARROW_DIRECTION.LEFT) {
			if (pageNumber > 0) {
				setPageNumber(pageNumber - 1);
			}
		}
	}


	useEffect(() => {
		focus();
		api.readChapter(id)
			.then((p: string[]) => setPages(p));
	}, []);

	return (
		<div tabIndex={1} className="reader-container" onKeyDown={handleKeyPress}>
			<ChapterReader
				page={pages.length > 0 ? pages[pageNumber] : null}
				onRightArrowClick={() => handleArrow(ARROW_DIRECTION.RIGHT)}
				onLeftArrowClick={() => handleArrow(ARROW_DIRECTION.LEFT)} ></ChapterReader>
		</div>
	);
}

export default ChapterReaderContainer;
