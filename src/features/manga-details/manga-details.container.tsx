import { useAppSelector } from 'app/hooks';
import { Chapter } from 'models/chapter';
import { Manga } from 'models/manga';
import React, { useEffect, useState } from 'react';
import MangaDetails from './manga-details';

function MangaDetailsContainer(props: any) {
	const { api } = useAppSelector((state) => state.api);
	const [manga, setManga] = useState(null);
	const [chapters, setChapters] = useState(null);
	const id: string = props.match.params.id;

	useEffect(() => {
		api.fetchMangaById(id)
			.then((manga: Manga) => setManga(manga));

		api.getChapters(id)
			.then((chs: Chapter[]) => setChapters(chs));
	}, []);

	return (
		<MangaDetails manga={manga} chapters={chapters}></MangaDetails>
	);
}

export default MangaDetailsContainer;
