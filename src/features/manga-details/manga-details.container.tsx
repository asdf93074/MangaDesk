import { useAppSelector } from 'app/hooks';
import { Manga } from 'models/manga';
import React, { useEffect, useState } from 'react';
import MangaDetails from './manga-details';

function MangaDetailsContainer(props: any) {
	const { api } = useAppSelector((state) => state.api);
	const [manga, setManga] = useState(null);
	const id: string = props.match.params.id;

	useEffect(() => {
		api.fetchMangaById(id)
			.then((manga: Manga) => setManga(manga));
	}, []);

	return (
		<MangaDetails manga={manga}></MangaDetails>
	);
}

export default MangaDetailsContainer;
