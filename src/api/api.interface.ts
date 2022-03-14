import { Chapter } from 'models/chapter';
import { Manga } from 'models/manga';

export interface MangaAPI {
	sourceName: string;
	populateHome: (offset: number) => Promise<Manga[]>;
	fetchMangaById: (id: string) => Promise<Manga>;
	getChapters: (id: string) => Promise<Chapter[]>
	readChapter: (id: string) => Promise<string[]>
}

export const a = 1;
