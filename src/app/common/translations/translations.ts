import { TRANSLATIONS_EN } from './translations.en';
import { TRANSLATIONS_ES } from './translations.es';

type TRANSLATIONS = {
  [key: string]: { [key: string]: string };
};

interface LANGUAGES {
  en: { [key: string]: string };
  'es-ES': { [key: string]: string };
}

export const TRANSLATIONS: LANGUAGES = {
  en: TRANSLATIONS_EN,
  'es-ES': TRANSLATIONS_ES,
};

export const DEFAULT_LANG: { [key: string]: string } = TRANSLATIONS['es-ES'];
