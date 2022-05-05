import { Component, OnInit } from '@angular/core';

import { UserLangService } from './common/translations/user-lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'apartamento-ayub';

  constructor(private userLangService: UserLangService) {}

  ngOnInit(): void {
    this.userLangService.initLang();
  }
}
