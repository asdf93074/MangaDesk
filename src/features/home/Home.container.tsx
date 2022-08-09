import { useAppSelector } from '../../app/hooks';
import React, { useEffect, useState } from 'react';
import Home from './home';
import { useApi } from 'api/hooks/useApi';
import { useSettings } from 'hooks/useSettings';

function HomeContainer() {
  let offset = useAppSelector((state) => state.home.offset);
  const settings = useSettings();
  const api = settings.API;
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
