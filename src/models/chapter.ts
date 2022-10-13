import { Manga } from './manga';

export interface Chapter {
  name: string;
  id: string;
  chapterNumber: string;
  volume: string;
  urls?: string[];
  manga?: Manga;
  next?: Chapter;
  previous?: Chapter;
}
