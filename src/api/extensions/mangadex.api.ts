import { a, MangaAPI } from 'api/api.interface';
import axios from 'axios';
import { Manga } from 'models/manga';

export class MangaDexAPI implements MangaAPI {
	sourceName = 'MangaDex';
	baseUrl = 'https://api.mangadex.org';
	a = a;

	populateHome = (offset: number): Promise<Manga[]> => {
		let mangas: Manga[] = [];
		return axios.get(`${this.baseUrl}/manga?limit=${30}&offset=${offset}&includes[]=cover_art`)
			.then((res) => {
				mangas = (res.data.data as []).map((d: any) => {
					const coverFileName: string = ((d.relationships as []).find((rel: any) => rel.type === 'cover_art') as any).attributes.fileName;

					return {
						name: d.attributes.title.en || d.attributes.altTitles[0],
						id: d.id,
						coverUrl: `https://uploads.mangadex.org/covers/${d.id}/${coverFileName}.256.jpg`,
						description: d.attributes.description.en || d.attributes.description[0],
						tags: (d.attributes.tags as []).filter((tag: any) => tag.attributes.group === 'genre').map((tag: any) => tag.attributes.name.en),
					};
				});

				return mangas;
			})
			.catch((res) => {
				console.error('Something went wrong while fetching manga.', res);
				return [];
			});
	};

	fetchMangaById = (id: string): Promise<Manga> => {
		return axios.get(`${this.baseUrl}/manga/${id}`)
			.then((res) => {
				const d = res.data.data;

				const data: Manga = {
					name: d.attributes.title.en || d.attributes.altTitles[0],
					id: d.id,
					coverUrl: null,
					description: d.attributes.description.en || d.attributes.description[0],
					tags: (d.attributes.tags as []).filter((tag: any) => tag.attributes.group === 'genre').map((tag: any) => tag.attributes.name.en),
				};

				return data;
			})
			.catch((res) => {
				console.error(`Something went wrong while fetching manga ${id}.`, res);
				return null;
			});
	};
}
