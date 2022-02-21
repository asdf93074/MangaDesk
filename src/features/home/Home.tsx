import FeatureHeader from 'components/feature-header/feature-header';
import { Manga } from 'models/manga';
import React, { useRef } from 'react';

import './Home.sass';
import MangaCard from './Manga-Card';

function Home(props: { mangaList: Manga[]; fetchData: () => any; }) {
	const listInnerRef = useRef(null);

	const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        props.fetchData();
      }
    }
  };

	return (
		<div className="home">
			<FeatureHeader title={'Manga'}></FeatureHeader>
			<div className="list" id="manga-list" ref={listInnerRef} onScroll={onScroll}>
				{
					props.mangaList.map((manga: Manga) =>
						<MangaCard
							key={manga.id}
							manga={manga}
						></MangaCard>)
				}
			</div>
		</div>
	);
}

export default Home;
