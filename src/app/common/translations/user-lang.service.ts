import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class UserLangService {
  constructor(
    private localStorage: LocalStorageService,
    private translateService: TranslateService
  ) {}

  initLang(): void {
    const userLang = this.getUserLang() || navigator.language;
    this.changeLang(userLang);
  }

  changeLang(lang: string): void {
    this.translateService.use(lang);
    this.localStorage.store('user-lang', lang);
  }

  private getUserLang(): string | null {
    return this.localStorage.retrieve('user-lang');
  }
}
