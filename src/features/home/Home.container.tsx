import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React, { useEffect, useState } from 'react';
import Home from './Home';
import { incrementOffset } from './home-slice';
import { Manga } from 'models/manga';

function HomeContainer() {
	const [mangas, setMangas] = useState([]);

	let offset = useAppSelector((state) => state.home.offset);
	const dispatch = useAppDispatch();
	const { api } = useAppSelector((state) => state.api);

	useEffect(() => {
		api.populateHome(offset)
			.then((nextMangas: Manga[]) => setMangas([...mangas, ...nextMangas]));
	}, []);

	const fetchData = () => {
		offset = offset + 30;
		dispatch(incrementOffset(30));
		api.populateHome(offset)
			.then((nextMangas: Manga[]) => setMangas([...mangas, ...nextMangas]));
	};

	return (
		<Home mangaList={mangas} fetchData={fetchData}></Home>
	);
}

export default HomeContainer;
