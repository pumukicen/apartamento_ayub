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

export interface PAGE_LANGUAGE {
  key: string;
  name: string;
}

export const pageLanguages: PAGE_LANGUAGE[] = [
  { key: 'es-ES', name: 'Es' },
  { key: 'en', name: 'En' },
];
