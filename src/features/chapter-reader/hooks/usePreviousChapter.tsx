import { MangaDexAPI } from 'api/extensions/mangadex/mangadex.api';
import { useApi } from 'api/hooks/useApi';
import { useSettings } from 'hooks/useSettings';
import { useEffect, useState } from 'react';

export default function usePreviousChapter(currentChapterId: string) {
  const api = useSettings('API') as MangaDexAPI;
  const getMangaFromChapterApi = useApi(() => api.getMangaByChapterId(currentChapterId));
  const [prevChapter, setPrevChapter] = useState(null);

  useEffect(() => {
    getMangaFromChapterApi.request();
  }, []);

  useEffect(() => {
    if (getMangaFromChapterApi.data) {
      console.log(getMangaFromChapterApi);
    }
  }, [getMangaFromChapterApi.data]);
}
