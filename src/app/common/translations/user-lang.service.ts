import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class UserLangService {
  private currentLang: string | undefined = undefined;

  constructor(
    private localStorage: LocalStorageService,
    private translateService: TranslateService,
    private dateAdapter: DateAdapter<any>
  ) {}

  initLang(): void {
    const userLang = this.getUserLang() || navigator.language;
    this.changeLang(userLang);
  }

  changeLang(lang: string): void {
    this.currentLang = lang;
    this.translateService.use(lang);
    this.localStorage.store('user-lang', lang);
    this.dateAdapter.setLocale(lang);
  }

  getCurrentLang(): string | undefined {
    return this.currentLang;
  }

  private getUserLang(): string | null {
    return this.localStorage.retrieve('user-lang');
  }
}
