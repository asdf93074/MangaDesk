import { a, MangaAPI } from 'api/api.interface';
import axios from 'axios';
import { Manga } from 'models/manga';

export class MangaDexAPI implements MangaAPI {
	sourceName = 'MangaDex';
	baseUrl = 'https://api.mangadex.org';
	a = a;

	populateHome = (offset: number): Promise<Manga[]> => {
		let mangas: Manga[] = [];
		let incompleteData: Array<{ name: string, id: string, coverId: string }>;

		return axios.get(`${this.baseUrl}/manga?limit=${30}&offset=${offset}`)
			.then((res) => {
				const data = (res.data.data as []).map((d: any) => {
					const name: string = d.attributes.title.en || d.attributes.altTitles[0];
					const id = d.id;
					const coverId = ((d.relationships as []).find((rel: any) => rel.type === 'cover_art') as any).id;
					return { name, id, coverId };
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
					};
				});

				return mangas;
			})
			.catch((res) => {
				console.error('Something went wrong while fetching manga.', res);
				return [];
			});
	};
}
