import { Component } from '@angular/core';
import { ImagenCarrusel } from 'src/app/common/carrusel/carrusel.component';

@Component({
  selector: 'app-apartamento',
  templateUrl: './apartamento.component.html',
  styleUrls: ['./apartamento.component.scss'],
})
export class ApartamentoComponent {
  imagenes: ImagenCarrusel[] = [
    { img: 'cabecero.jpg' },
    { img: 'comedor.jpg', title: 'Comedor' },
    { img: 'salon.jpg', title: 'Salón' },
    { img: 'principal.jpg', title: 'Dormitorio principal' },
    { img: 'niños.jpg', title: 'Dormitorio' },
    { img: 'cocina.jpg', title: 'Cocina' },
    { img: 'baño.jpg', title: 'Baño' },
  ];
}
