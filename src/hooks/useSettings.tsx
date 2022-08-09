import { MangaDexAPI } from 'api/extensions/mangadex/mangadex.api';
import { AVAILABLE_MANGA_LANGUAGES } from 'utils/utils';

const SETTINGS = {
  LANGUAGE: AVAILABLE_MANGA_LANGUAGES.ENGLISH,
  API: new MangaDexAPI(),
};

export function useSettings() {
  return SETTINGS;
}
