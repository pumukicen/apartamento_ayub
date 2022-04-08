import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';

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
    { name: 'menu_reserva', link: '/reserva' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.listenNavigation();
  }

  private listenNavigation(): void {
    this.router.events.subscribe((event) => {
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
