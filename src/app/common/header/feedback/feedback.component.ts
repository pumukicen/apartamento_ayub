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
            this.myToastrService.success('toastr_feedback_succes');
            this.opened = false;
          } else this.myToastrService.error('toastr_feedback_error');
        });
  }
}
