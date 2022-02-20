import { a, MangaAPI } from 'api/api.interface';
import axios from 'axios';
import { Manga } from 'models/manga';

export class MangaDexAPI implements MangaAPI {
	sourceName = 'MangaDex';
	baseUrl = 'https://api.mangadex.org';
	a = a;

	populateHome = (offset: number): Promise<Manga[]> => {
		let mangas: Manga[] = [];
		let incompleteData: any[];

		return axios.get(`${this.baseUrl}/manga?limit=${30}&offset=${offset}`)
			.then((res) => {
				const data = (res.data.data as []).map((d: any) => {
					return {
						name: d.attributes.title.en || d.attributes.altTitles[0],
						id: d.id,
						coverId: ((d.relationships as []).find((rel: any) => rel.type === 'cover_art') as any).id,
						description: d.attributes.description.en || d.attributes.description[0],
					};
				});

				const coverUrls = axios.all(data.map((d) => axios.get(`${this.baseUrl}/cover/${d.coverId}`))).then((res: any) => {
					return res.map((coverInfo: any) => coverInfo.data.data.attributes.fileName);
				});

				incompleteData = data;

				return coverUrls;
			})
			.then((coverUrls: string[]) => {
				mangas = incompleteData.map((d, i) => {
					return {
						id: d.id,
						name: d.name,
						coverUrl: `https://uploads.mangadex.org/covers/${d.id}/${coverUrls[i]}.512.jpg`,
						description: d.description,
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
					tags: (d.attributes.tags as []).map((tag: any) => tag.attributes.name.en),
				};

				return data;
			})
			.catch((res) => {
				console.error(`Something went wrong while fetching manga ${id}.`, res);
				return null;
			});
	};
}
