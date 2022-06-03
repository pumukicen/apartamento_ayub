import { Component } from '@angular/core';
import { ImagenCarrusel } from 'src/app/common/carrusel/carrusel.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  imagenes: ImagenCarrusel[] = [
    { img: 'inicio1.jpg' },
    { img: 'inicio.jpg' },
    { img: 'inicio4.jpg' },
    { img: 'inicio2.jpg' },
    { img: 'inicio3.jpg' },
    { img: 'inicio7.jpg' },
  ];
}
