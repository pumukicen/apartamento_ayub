import { Component, OnInit } from '@angular/core';

import { UserLangService } from './../translations/user-lang.service';
import { Comentario } from './comentarios.model';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {
  comentarios: Comentario[];
  constructor(
    private comentariosService: ComentariosService,
    private userLangService: UserLangService
  ) {}

  ngOnInit(): void {
    this.comentariosService.comentariosList$.subscribe(
      (comentarios: Comentario[]) => {
        const comentariosByLang = comentarios.filter((c) =>
          c.lang ? c.lang === this.userLangService.getCurrentLang() : true
        );
        this.comentarios = this.randomComentarios(comentariosByLang);
      }
    );
  }

  randomComentarios(comentarios: Comentario[]): Comentario[] {
    return comentarios
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .filter((c, i) => i < 3);
  }
}
