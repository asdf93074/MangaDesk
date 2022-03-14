import { a, MangaAPI } from 'api/api.interface';
import axios from 'axios';
import { Chapter } from 'models/chapter';
import { Manga } from 'models/manga';

export class MangaDexAPI implements MangaAPI {
	sourceName = 'MangaDex';
	baseUrl = 'https://api.mangadex.org';
	a = a;

	populateHome = (offset: number): Promise<Manga[]> => {
		return axios.get(`${this.baseUrl}/manga?limit=${30}&offset=${offset}&includes[]=cover_art`)
			.then((res) => {
				return (res.data.data as []).map((d: any) => mapResponseToMangaObject(d));
			})
			.catch((res) => {
				console.error('Something went wrong while fetching manga.', res);
				return [];
			});
	};

	fetchMangaById = (id: string): Promise<Manga> => {
		return axios.get(`${this.baseUrl}/manga/${id}?includes[]=cover_art`)
			.then((res) => {
				return mapResponseToMangaObject(res.data.data);
			})
			.catch((res) => {
				console.error(`Something went wrong while fetching manga ${id}.`, res);
				return null;
			});
	};

	getChapters = (id: string): Promise<Chapter[]> => {
		return axios.get(`${this.baseUrl}/chapters/${id}`)
			.then((res) => {
				return (res.data.data as []).map(mapResponseToChapterObject);
			})
			.catch((res) => {
				console.error(`Something went wrong while fetching chapters for manga ${id}.`, res);
				return null;
			});
	};
}

function mapResponseToMangaObject(manga: any): Manga {
	const coverFileName: string = ((manga.relationships as []).find((rel: any) => rel.type === 'cover_art') as any).attributes.fileName;

	return {
		name: manga.attributes.title.en || manga.attributes.altTitles[0],
		id: manga.id,
		coverUrl: `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}.256.jpg`,
		description: manga.attributes.description.en || manga.attributes.description[0],
		tags: (manga.attributes.tags as []).filter((tag: any) => tag.attributes.group === 'genre').map((tag: any) => tag.attributes.name.en),
	};
}

function mapResponseToChapterObject(ch: any): Chapter {
	return;
}
