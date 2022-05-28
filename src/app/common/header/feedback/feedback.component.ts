import { MyToastrService } from './../../toastr/my-toastr.service';
import { Component } from '@angular/core';

import { ComentariosService } from './../../comentarios/comentarios.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  opened: boolean;
  comment: string = '';

  constructor(
    private comentariosService: ComentariosService,
    private myToastrService: MyToastrService
  ) {
    this.comentariosService.myComment$.subscribe((comment) => {
      if (comment) this.comment = comment.text;
      else this.comment = '';
    });
  }

  get valid(): boolean {
    return this.comment.length >= 10;
  }

  enviar(): void {
    if (this.valid)
      this.comentariosService
        .saveComment(this.comment)
        .subscribe((response) => {
          if (response) {
            this.myToastrService.success('Se ha registrado su comentario');
            this.opened = false;
          } else
            this.myToastrService.error('No se ha registrado su comentario');
        });
  }
}
