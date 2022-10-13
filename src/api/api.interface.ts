import { Chapter } from 'models/chapter';
import { Manga } from 'models/manga';

export interface MangaAPI {
  sourceName: string;

  /* Gets a bunch of manga from the API to show on the home screen. */
  populateHome: (offset: number) => Promise<Manga[]>;

  /* Gets a manga by the id given for it. */
  getMangaById: (id: string) => Promise<Manga>;

  /* Gets a manga feed by the id given for it. */
  getMangaFeedByMangaId: (id: string) => Promise<Chapter[]>;

  /* Gets all the chapters for a particular manga. */
  getChaptersByMangaId: (mangaId: string) => Promise<Chapter[]>;

  /* Gets the navigation object for a Chapter when given a particular chapter id. */
  getChapterNavigationByChapterId: (id: string) => Promise<Chapter>;

  /* Gets the manga ID for a particular chapter id. */
  getMangaIdByChapterId: (id: string) => Promise<string>;

  /* Reads a chapter by getting all the image URLs for it. */
  readChapter: (id: string) => Promise<Chapter>;
}

export const a = 1;
