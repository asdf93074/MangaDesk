import { Manga } from 'models/manga';

export interface MangaAPI {
	sourceName: string;
	populateHome: (offset: number) => Promise<Manga[]>;
}

export const a = 1;
