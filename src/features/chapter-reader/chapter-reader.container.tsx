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
  const readChapterApi = useApi(() => api.readChapter(id));

  const [pageNumber, setPageNumber] = useState(parseInt(params.pageNumber));
  usePreloadImages(readChapterApi.data || []);
  const rightKeyPress = useKeyPress(KEY_CODES.ARROW_RIGHT);
  const leftKeyPress = useKeyPress(KEY_CODES.ARROW_LEFT);

  const goNextPage = () => {
    if (pageNumber < readChapterApi.data.length - 1) {
      setPageNumber(pageNumber + 1);
      navigate(`/chapter/${id}/read/${pageNumber + 1}`);
    } else {
      navigate(`/chapter/${chapterNavigation.data.next.id}/read/0`);
      navigate(0);
    }
  };
  const goPreviousPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
      navigate(`/chapter/${id}/read/${pageNumber - 1}`);
    } else {
      navigate(`/chapter/${chapterNavigation.data.previous.id}/read/0`);
      navigate(0);
    }
  };

  rightKeyPress(goNextPage);
  leftKeyPress(goPreviousPage);

  useEffect(() => {
    focus();
    readChapterApi.request();
    chapterNavigation.request();
  }, []);

  return (
    <div tabIndex={1} className="reader-container">
      <ChapterReader page={readChapterApi.data?.length > 0 ? readChapterApi.data[pageNumber] : null}></ChapterReader>
    </div>
  );
}

export default ChapterReaderContainer;
