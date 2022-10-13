import { MangaDexAPI } from 'api/extensions/mangadex/mangadex.api';
import { useApi } from 'api/hooks/useApi';
import { usePreloadImages } from 'hooks/usePreloadImages';
import { useSettings } from 'hooks/useSettings';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ChapterReader from './chapter-reader';
import useKeyPress from 'hooks/useKeyPress';
import { KEY_CODES } from 'constants/keyCodes';

function ChapterReaderContainer(props: any) {
  const navigate = useNavigate();
  const params = useParams();

  const id: string = params.id;

  const api = useSettings('API') as MangaDexAPI;
  const chapterNavigation = useApi(() => api.getChapterNavigationByChapterId(id));
  const pageUrls = useApi(() => api.readChapter(id));
  usePreloadImages(pageUrls.data || []);

  /*
   * const chapterNavigation = buildChapterNavigation();
   *
   */

  const [pageNumber, setPageNumber] = useState(parseInt(params.pageNumber));

  const rightKeyPress = useKeyPress(KEY_CODES.ARROW_RIGHT);
  const leftKeyPress = useKeyPress(KEY_CODES.ARROW_LEFT);
  const escKeyPress = useKeyPress(KEY_CODES.ESC);

  const goNextPageOrChapter = () => {
    if (pageNumber < pageUrls.data.length - 1) {
      setPageNumber(pageNumber + 1);
      navigate(`/chapter/${id}/read/${pageNumber + 1}`);
    } else {
      navigate(`/chapter/${chapterNavigation.data.next.id}/read/0`);
      navigate(0);
    }
  };
  const goPreviousPageOrChapter = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
      navigate(`/chapter/${id}/read/${pageNumber - 1}`);
    } else {
      navigate(`/chapter/${chapterNavigation.data.previous.id}/read/0`);
      navigate(0);
    }
  };
  const goToMangaPage = () => {
    navigate(`/manga/${chapterNavigation.data.manga.id}`);
  };

  rightKeyPress(goNextPageOrChapter);
  leftKeyPress(goPreviousPageOrChapter);
  escKeyPress(goToMangaPage);

  useEffect(() => {
    focus();
    pageUrls.request();
    chapterNavigation.request();
  }, []);

  return (
    <div tabIndex={1} className="reader-container">
      <ChapterReader
        page={pageUrls.data?.length > 0 ? pageUrls.data[pageNumber] : null}
        mangaName={chapterNavigation.data?.name}
        goToMangaPage={goToMangaPage}>
      </ChapterReader>
    </div>
  );
}

export default ChapterReaderContainer;
