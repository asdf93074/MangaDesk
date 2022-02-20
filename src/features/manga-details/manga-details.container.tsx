import { useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import MangaDetails from './manga-details';

function MangaDetailsContainer(props: any) {
	const { api } = useAppSelector((state) => state.api);
	const [manga, setManga] = useState(null);
	const id: string = props.match.params.id;

	useEffect(() => {
		api.fetchMangaById(id)
			.then(setManga);
	});

	return (
		<MangaDetails manga={manga}></MangaDetails>
	);
}

export default MangaDetailsContainer;
