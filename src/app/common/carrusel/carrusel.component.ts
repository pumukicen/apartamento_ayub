import { Component, Input } from '@angular/core';

export interface ImagenCarrusel {
  img: string;
  title?: string;
}
@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss'],
})
export class CarruselComponent {
  @Input() identificador: string = 'carrusel';
  @Input() imagenes: ImagenCarrusel[] = [];
}
