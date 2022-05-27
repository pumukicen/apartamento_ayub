import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { PAGE_LANGUAGE } from '../translations/translations';
import { AuthService, UserData } from './../../authentication/auth.service';
import { pageLanguages } from './../translations/translations';
import { UserLangService } from './../translations/user-lang.service';

export interface MenuItem {
  name: string;
  children?: MenuItem[];
  link?: string;
  active?: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbar') navbar: ElementRef;
  menuItems: MenuItem[] = [
    { name: 'menu_inicio', link: '/inicio' },
    { name: 'menu_apartamento', link: '/apartamento' },
    {
      name: 'menu_experiencias',
      children: [
        { name: 'menu_experiencias_restaurantes', link: '/restaurantes' },
        { name: 'menu_experiencias_lugares', link: '/lugares' },
        { name: 'menu_experiencias_eventos', link: '/eventos' },
      ],
    },
    { name: 'menu_entorno', link: '/entorno' },
    {
      name: 'menu_informacion',
      children: [
        { name: 'menu_informacion_servicios', link: '/servicios' },
        { name: 'menu_informacion_normas', link: '/normas' },
        { name: 'menu_informacion_condiciones', link: '/condiciones' },
      ],
    },
    { name: 'menu_blog', link: '/blog' },
    { name: 'menu_contacto', link: '/contacto' },
    { name: 'menu_reservar', link: '/reservar' },
  ];

  languages: PAGE_LANGUAGE[] = pageLanguages;

  get currentLang(): string | undefined {
    return this.userLangService.getCurrentLang();
  }

  get currentUser(): UserData | null {
    return this.authService.currentUser();
  }

  constructor(
    private router: Router,
    private userLangService: UserLangService,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.listenNavigation();
  }

  changeCurrentLanguage(lang: PAGE_LANGUAGE): void {
    this.userLangService.changeLang(lang.key);
  }

  logout(): void {
    this.authService.logout();
  }

  private listenNavigation(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.navbar)
          this.renderer.removeClass(this.navbar.nativeElement, 'show');
      }
      if (event instanceof NavigationEnd) {
        this.unactiveItems(this.menuItems);
        const selectedItem = this.findItemByUrl(event.url, this.menuItems);
        this.activeItem(selectedItem, true);
      }
    });
  }

  private findItemByUrl(url: string, items: MenuItem[]): MenuItem {
    for (let item of items) {
      if (item.link === url) return item;
      if (item.children) {
        const child = item.children.find((ch) => ch.link === url);
        if (child) return child;
      }
    }
    return this.menuItems[0];
  }

  private activeItem(item: MenuItem, active: boolean): void {
    item.active = active;
    if (!active && item.children) this.unactiveItems(item.children);
  }

  private unactiveItems(items: MenuItem[]): void {
    items.forEach((item) => this.activeItem(item, false));
  }
}
