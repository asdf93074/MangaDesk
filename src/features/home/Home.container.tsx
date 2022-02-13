import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React, { useEffect, useState } from 'react';
import Home from './Home';
import { nextPage } from './home-slice';
import { Manga } from 'models/manga';

function HomeContainer() {
	const [mangas, setMangas] = useState([]);

	const offset = useAppSelector((state) => state.home.offset);
	const dispatch = useAppDispatch();
	const { api } = useAppSelector((state) => state.api);

	useEffect(() => {
		api.populateHome(offset)
			.then((nextMangas: Manga[]) => setMangas([...mangas, ...nextMangas]));
	}, []);


	const fetchData = () => {
		dispatch(nextPage());
		api.populateHome(offset)
			.then((nextMangas: Manga[]) => setMangas([...mangas, ...nextMangas]));
	};

	return (
		<Home mangaList={mangas} fetchData={fetchData}></Home>
	);
}

export default HomeContainer;
