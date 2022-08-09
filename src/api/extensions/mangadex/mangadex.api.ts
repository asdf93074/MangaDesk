import { MangaAPI } from 'api/api.interface';
import { Chapter } from 'models/chapter';
import { Manga } from 'models/manga';
import { AVAILABLE_MANGA_LANGUAGES } from 'utils/utils';
import { buildMangadexRequest, getDefaultParams } from './utils';

export class MangaDexAPI implements MangaAPI {
	sourceName = 'MangaDex';
	translationMapping: Map<AVAILABLE_MANGA_LANGUAGES, string> = new Map<AVAILABLE_MANGA_LANGUAGES, string>();

	populateHome = (offset: number): Promise<Manga[]> => {
    const queryParams = Object.assign(getDefaultParams(), {
      limit: 31,
      offset: offset,
      includes: [
        'cover_art',
      ],
    });

    return buildMangadexRequest('GET', 'manga', null, queryParams)
      .then((res) => {
        return (res.data.data as []).map((d: any) => mapResponseToMangaObject(d));
      })
      .catch((res) => {
        console.error('Something went wrong while fetching manga.', res);
        return [];
      });
	};

	fetchMangaById = (id: string): Promise<Manga> => {
    const queryParams = Object.assign(getDefaultParams(), {
      includes: [
        'cover_art',
      ],
    });

    return buildMangadexRequest('GET', 'manga', [id], queryParams)
      .then((res) => {
        return mapResponseToMangaObject(res.data.data);
      })
      .catch((res) => {
        console.error(`Something went wrong while fetching manga ${id}.`, res);
        return null;
      });
	};

	getChapters = (id: string): Promise<Chapter[]> => {
    return buildMangadexRequest('GET', 'manga', [id, 'aggregate'])
      .then((res) => {
        const chapters: any[] = [];
        Object.values(res.data.volumes).forEach((v: any) => chapters.push(...Object.values(v.chapters)));
        return chapters.map(mapResponseToChapterObject);
      })
      .catch((res) => {
        console.error(`Something went wrong while fetching chapters for manga ${id}.`, res);
        return null;
      });
	};

	readChapter = (id: string): Promise<string[]> => {
    return buildMangadexRequest('GET', 'at-home', ['server', id])
			.then((res) => {
				const body = res.data;
				const baseServerUrl = body.baseUrl;
				const hash = body.chapter.hash;
				const urls = (body.chapter.data as []).map((d) => createPageUrl(baseServerUrl, 'data', hash, d));
				return urls;
			})
			.catch((res) => {
				console.error(`Something went wrong while fetching chapter ${id}.`, res);
				return null;
			});
	};
}

function mapResponseToMangaObject(manga: any): Manga {
	const coverFileName: string = ((manga.relationships as []).find((rel: any) => rel.type === 'cover_art') as any).attributes.fileName;

	return {
		name: manga.attributes.title.en || Object.values(manga.attributes.altTitles[0])[0],
		id: manga.id,
		coverUrl: `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}.256.jpg`,
		description: manga.attributes.description.en || manga.attributes.description[0],
		tags: (manga.attributes.tags as []).filter((tag: any) => tag.attributes.group === 'genre').map((tag: any) => tag.attributes.name.en),
	};
}

function mapResponseToChapterObject(ch: any): Chapter {
	return {
		name: ch.chapter,
		id: ch.id,
		volume: 0,
		chapterNumber: ch.chapter,
	};
}

function createPageUrl(baseUrl: string, data: string, hash: string, filename: string) {
	return `${baseUrl}/${data}/${hash}/${filename}`;
}
