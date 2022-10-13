import FeatureHeader from 'components/feature-header/feature-header';
import { Manga } from 'models/manga';
import React, { useRef } from 'react';

import './Home.sass';
import MangaCard from './components/manga-card/manga-card';

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
    props.mangaList?.length > 0 ?
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
      </div> :
      <div>Loading...</div>
  );
}

export default Home;
