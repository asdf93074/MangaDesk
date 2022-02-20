import React, { useRef } from 'react';

import './Home.sass';
import MangaCard from './Manga-Card';

function Home(props: { mangaList: any[]; fetchData: () => any; }) {
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
			<div className="title">
				<h3>Manga</h3>
			</div>
			<div className="list" id="manga-list" ref={listInnerRef} onScroll={onScroll}>
				{props.mangaList.map((manga) => <MangaCard key={manga.id} coverUrl={manga.coverUrl}></MangaCard>)}
			</div>
		</div>
	);
}

export default Home;