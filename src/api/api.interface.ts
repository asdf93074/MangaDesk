import { Manga } from 'models/manga';

export interface MangaAPI {
	sourceName: string;
	populateHome: (offset: number) => Promise<Manga[]>;
	fetchMangaById: (id: string) => Promise<Manga>;
}

export const a = 1;
