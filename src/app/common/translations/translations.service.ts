import { TRANSLATIONS, DEFAULT_LANG } from './translations';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TranslationsService implements TranslateLoader {
  getTranslation(lang: string): Observable<{ [key: string]: string }> {
    const translations = Object.entries(TRANSLATIONS).find(
      (entry) => entry[0] === lang
    );
    return of(translations ? translations[1] : DEFAULT_LANG);
  }
}
