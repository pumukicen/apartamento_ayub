import { Component, Input } from '@angular/core';
import { Comentario } from 'src/app/common/comentarios/comentarios.model';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss'],
})
export class ComentarioComponent {
  @Input() comentario: Comentario;
  get userAvatar(): string {
    return this.comentario.img
      ? `url("${this.comentario.img}")`
      : `url("./assets/img/persona.png")`;
  }
}
