import { Component, OnInit } from '@angular/core';

import { UserLangService } from './../translations/user-lang.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private userLangService: UserLangService) {}

  ngOnInit(): void {}

  lang(lang: string): void {
    this.userLangService.changeLang(lang);
  }
}
