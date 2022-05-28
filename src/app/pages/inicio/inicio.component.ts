import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/common/comentarios/comentarios.model';

import { ComentariosService } from './../../common/comentarios/comentarios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  comentarios: Comentario[];

  constructor(private comentariosService: ComentariosService) {}

  ngOnInit(): void {
    this.comentariosService.comentariosList$.subscribe(
      (comentarios: Comentario[]) => {
        this.comentarios = this.randomComentarios(comentarios);
      }
    );
  }

  randomComentarios(comentarios: Comentario[]): Comentario[] {
    return comentarios
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .filter((c, i) => i < 3);
  }
}
