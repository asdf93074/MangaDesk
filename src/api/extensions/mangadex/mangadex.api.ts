import { MangaAPI } from 'api/api.interface';
import { Chapter } from 'models/chapter';
import { Manga } from 'models/manga';
import { AVAILABLE_MANGA_LANGUAGES, CURRENT_LANGUAGE } from 'utils/utils';
import { buildMangadexRequest, getDefaultParams, TRANSLATION_MAPPING } from './utils';

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

    return buildMangadexRequest('GET', 'manga', [], queryParams)
      .then((res) => {
        return (res.data as []).map((d: any) => mapResponseToMangaObject(d));
      })
      .catch((res) => {
        console.error('Something went wrong while fetching manga.', res);
        return [];
      });
  };

  getMangaById = (id: string): Promise<Manga> => {
    const queryParams = Object.assign(getDefaultParams(), {
      includes: [
        'cover_art',
      ],
    });

    return buildMangadexRequest('GET', 'manga', [id], queryParams)
      .then((res) => {
        return mapResponseToMangaObject(res.data);
      })
      .catch((res) => {
        console.error(`Something went wrong while fetching manga ${id}.`, res);
        return null;
      });
  };

  // getChapterById = (id: string): Promise<Chapter> => {
  //   const queryParams = Object.assign(getDefaultParams(), {
  //     includes: [
  //       'manga',
  //     ],
  //   });

  //   return buildMangadexRequest('GET', 'chapter', [id], queryParams)
  //     .then((res) => {
  //       return mapResponseToMangaObject(res.data);
  //     })
  //     .catch((res) => {
  //       console.error(`Something went wrong while fetching manga ${id}.`, res);
  //       return null;
  //     });
  // }

  getChaptersByMangaId = (id: string): Promise<Chapter[]> => {
    return buildMangadexRequest('GET', 'manga', [id, 'aggregate'], {
      translatedLanguage: [TRANSLATION_MAPPING.get(CURRENT_LANGUAGE)],
    })
      .then((res) => {
        const chapters: any[] = [];
        Object.values(res.volumes).forEach((v: any) => chapters.push(...Object.values(v.chapters)));
        return chapters.map(mapResponseToChapterObject);
      })
      .catch((res) => {
        console.error(`Something went wrong while fetching chapters for manga ${id}.`, res);
        return null;
      });
  };

  getMangaFeedByMangaId = (id: string): Promise<Chapter[]> => {
    return buildMangadexRequest('GET', 'manga', [id, 'feed'], {
      'translatedLanguage': [TRANSLATION_MAPPING.get(CURRENT_LANGUAGE)],
      'includes': ['manga'],
      'order[chapter]': 'desc',
    })
      .then((res) => {
        return mapMangaFeedResponseToChapter(res);
      })
      .catch((res) => {
        console.error(`Something went wrong while fetching chapters for manga ${id}.`, res);
        return null;
      });
  };

  getChapterNavigationByChapterId = async (id: string): Promise<Chapter> => {
    const { mangaId, scanlationId } = await this.getMangaAndScanlationIdsByChapterId(id);

    const queryParams = Object.assign({
      groups: [
        scanlationId,
      ],
    });

    return buildMangadexRequest<Chapter>('GET', 'manga', [mangaId, 'aggregate'], queryParams)
      .then((res) => {
        const flattenedChapterArray: Array<{ chapter: string, id: string }> = Object.values(res.volumes).flatMap((v: any) => Object.values(v.chapters));
        const chapters: Chapter[] = flattenedChapterArray.map((ch, i) => ({
          id: ch.id,
          name: ch.id,
          chapterNumber: ch.chapter,
          volume: '',
        }));
        chapters.forEach((ch, i) => {
          ch.previous = i > 0 ? chapters[i - 1] : null;
          ch.next = i < chapters.length - 1 ? chapters[i + 1] : null;
        });
        return chapters.find((ch) => ch.id === id);
      })
      .catch((res) => {
        console.error(`Something went wrong while fetching chapter ${id}.`, res);
        return null;
      });
  };

  getMangaAndScanlationIdsByChapterId = (id: string): Promise<{ mangaId: string, scanlationId: string }> => {
    const queryParams = Object.assign({
      includes: [
        'manga',
        'scanlation_group',
      ],
    });

    return buildMangadexRequest('GET', 'chapter', [id], queryParams)
      // eslint-disable-next-line no-invalid-this
      .then((res) => ({
        mangaId: this.resolveRelationship(res.data, 'manga').id,
        scanlationId: this.resolveRelationship(res.data, 'scanlation_group').id,
      }))
      .catch((res) => {
        console.error(`Something went wrong while fetching chapter ${id}.`, res);
        return null;
      });
  };

  readChapter = (id: string): Promise<Chapter> => {
    return buildMangadexRequest('GET', 'at-home', ['server', id])
      .then((res) => {
        const urls = (res.chapter.data as []).map((d) => createPageUrl(res.baseUrl, 'data', res.chapter.hash, d));
        return urls;
      })
      .catch((res) => {
        console.error(`Something went wrong while reading chapter ${id}.`, res);
        return null;
      });
  };

  resolveRelationship = (data: any, relName: string) => {
    return (data.relationships as []).find((r: any) => r.type === relName);
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

function mapMangaFeedResponseToChapter(mangaFeed: { data: Array<{ attributes: { chapter: string, volume: string }, id: string }> }): Chapter[] {
  const chapters: Chapter[] = mangaFeed.data.map((chapter) => ({
    name: chapter.id,
    id: chapter.id,
    chapterNumber: chapter.attributes.chapter,
    volume: chapter.attributes.volume,
    manga: (chapter as any).relationships.find(i => i.type === 'manga').id,
  }));

  chapters.forEach((ch, i) => {
    if (i > 1) ch.previous = chapters[i - 1];
    if (i < chapters.length - 1) ch.next = chapters[i + 1];
  });

  return chapters;
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


