import { Component, OnInit } from '@angular/core';

import { Comentario } from './comentarios.model';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {
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
