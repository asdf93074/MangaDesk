import { useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import ChapterReader from './chapter-reader';

function ChapterReaderContainer(props: any) {
	const { api } = useAppSelector((state) => state.api);
	const [pages, setPages] = useState(null);
	const id: string = props.match.params.id;

	useEffect(() => {
		api.readChapter(id)
			.then((p: string[]) => setPages(p));
	}, []);

	return (
		<ChapterReader pages={pages}></ChapterReader>
	);
}

export default ChapterReaderContainer;
