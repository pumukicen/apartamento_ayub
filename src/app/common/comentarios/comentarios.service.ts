import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Comentario } from './comentarios.model';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private _comentarios: Comentario[] = [
    {
      text: 'El piso era más grande de lo que esperábamos y la ubicación excelente, en todo el centro de Calatayud.',
      user: 'Julian',
      date: new Date(),
    },
    {
      text: 'Apartamento decorado con un gusto exquisito y menaje muy completo. A los niños les gustó mucho el cuarto infantil con libros y juguetes a su disposición (todo un detalle). Fácil aparcamiento.',
      user: 'Maria',
      date: new Date(),
    },
    {
      text: 'Un apartamento cómodo y súper céntrico. Hemos pasado el puente muy a gusto, un espacio con todas las comodidades y cálido. Muy bien situado en el centro de la ciudad.',
      user: 'Jesus',
      date: new Date(),
    },
    { text: 'Perfecto para mis bacanales.', user: 'Adrian', date: new Date() },
  ];

  set comentarios(comentarios: Comentario[]) {
    this._comentarios = comentarios;
  }

  get comentarios(): Comentario[] {
    return this._comentarios;
  }

  constructor() {}

  getComentarios(): Observable<Comentario[]> {
    return of(this.comentarios);
  }
}
