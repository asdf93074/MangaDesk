import MangaInfo from 'models/MangaInfo.model';

import {MangaApi} from 'api/api.interface';
import axios from 'axios';
import {CoverArt} from 'models/CoverArt.model';

const concatBaseUrlWithRoute = (baseUrl: string, route: string) => baseUrl +route;

export class MangadexApi implements MangaApi {
	website = 'MangaDex';
	baseUrl = 'https://api.mangadex.org';
	manga: MangaInfo;

	getApi(): MangaApi {
		return this;
	}

	routes = {
		'ping': {
			url: concatBaseUrlWithRoute(this.baseUrl, '/ping'),
			convert: console.log,
		},
		'get': {
			'url': concatBaseUrlWithRoute(this.baseUrl, '/manga?limit=32&offset=0&includes[]=cover_art&includes[]=author&includes[]=artist&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[followedCount]=desc'),
			'convert': async (data: any[], i: any) => {
				const newData: any[] = [];

				for (let index = 0; index < data.length; index++) {
					const coverUrl: string = await new CoverArt(this.getApi()).getCoverUrl(
						(data[index].relationships as any[]).find((i: any) => i.type === 'cover_art').id,
						data[index].id,
					);

					newData.push({
						title: data[index].attributes.title.en,
						name: data[index].attributes.title.en,
						url: (data[index].relationships as any[]).find((i: any) => i.type === 'cover_art'),
						id: data[index].id,
						coverImageUrl: coverUrl,
					});
				}

				return newData;
			},
		},
		'getCoverUrl': {
			convert: (coverId: string, mangaId: string) => {
				return axios.get(
					concatBaseUrlWithRoute(this.baseUrl, `/cover/${coverId}`),
				).then((cover: any) => {
					cover = cover.data.data;
					return `https://uploads.mangadex.org/covers/${mangaId}/${cover.attributes.fileName}.512.jpg`;
				});
			},
		},
	};

	constructor() {
		this.manga = new MangaInfo(this);
	}
}
