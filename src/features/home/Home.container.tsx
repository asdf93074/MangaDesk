import { useAppSelector } from '../../app/hooks';
import React, { useEffect, useState } from 'react';
import Home from './home';
import { useApi } from 'api/hooks/useApi';
import { useSettings } from 'hooks/useSettings';
import { MangaAPI } from 'api/api.interface';

function HomeContainer() {
  let offset = useAppSelector((state) => state.home.offset);
  const api = useSettings('API') as MangaAPI;
	const [mangas, setMangas] = useState([]);
  const populateHomeApi = useApi(() => api.populateHome(offset));

	useEffect(() => {
		populateHomeApi.request();
	}, []);

  useEffect(() => {
    if (populateHomeApi.data) {
      setMangas([...mangas, ...populateHomeApi.data]);
    }
  }, [populateHomeApi.data]);

	const fetchData = () => {
		offset = offset + 30;
		populateHomeApi.request();
	};

	return (
		<Home mangaList={mangas} fetchData={fetchData}></Home>
	);
}

export default HomeContainer;
