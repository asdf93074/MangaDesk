import { useAppSelector } from 'app/hooks';
import { Chapter } from 'models/chapter';
import { Manga } from 'models/manga';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MangaDetails from './manga-details';

function MangaDetailsContainer(props: any) {
  const params = useParams();
  const { api } = useAppSelector((state) => state.api);
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState(null);

  const id: string = params.id;

  useEffect(() => {
    api.getMangaById(id)
      .then((manga: Manga) => setManga(manga));

    // api.getChaptersByMangaId(id)
    //   .then((chs: Chapter[]) => setChapters(chs));

    api.getMangaFeedByMangaId(id)
      .then((chs: Chapter[]) => setChapters(chs));
  }, []);

  return (
    <MangaDetails manga={manga} chapters={chapters}></MangaDetails>
  );
}

export default MangaDetailsContainer;
