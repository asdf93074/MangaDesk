import axios, { Method } from 'axios';
import { AVAILABLE_MANGA_LANGUAGES, CURRENT_LANGUAGE } from 'utils/utils';

export const TRANSLATION_MAPPING: Map<AVAILABLE_MANGA_LANGUAGES, string> = new Map<AVAILABLE_MANGA_LANGUAGES, string>();
TRANSLATION_MAPPING.set(AVAILABLE_MANGA_LANGUAGES.ENGLISH, 'en');

export const BASE_URL = 'https://api.mangadex.org';
export const getDefaultParams = () => {
  return {
    limit: 32,
    hasAvailableChapters: true,
    availableTranslatedLanguage: [
      TRANSLATION_MAPPING.get(CURRENT_LANGUAGE),
    ],
  };
};
export const MangadexClient = axios.create({
  baseURL: BASE_URL,
});

export function buildMangadexRequest<D>(method: Method, resource: string, subRoutes?: string[], params?: any, data?: D) {
  // eslint-disable-next-line new-cap
  return MangadexClient(
    buildMangadexURL(resource, subRoutes),
    {
      method,
      params,
      data,
    },
  );
}

export function buildMangadexURL(resource: string, subRoutes: string[]): string {
  return [resource, ...subRoutes].filter((s) => s).join('/');
}
