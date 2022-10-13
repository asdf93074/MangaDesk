import { MangaDexAPI } from 'api/extensions/mangadex/mangadex.api';
import { AVAILABLE_MANGA_LANGUAGES } from 'utils/utils';

const SETTINGS = {
  LANGUAGE: AVAILABLE_MANGA_LANGUAGES.ENGLISH,
  API: new MangaDexAPI(),
  BACK_PATH: '/',
};

export function useSettings(key?: keyof typeof SETTINGS) {
  if (SETTINGS.hasOwnProperty(key)) return SETTINGS[key];

  return SETTINGS;
}
