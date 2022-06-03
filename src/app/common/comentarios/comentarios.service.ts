import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { BehaviorSubject, from, map, Observable, of } from 'rxjs';

import { UserLangService } from '../translations/user-lang.service';
import { AuthService, UserData } from './../../authentication/auth.service';
import { Comentario } from './comentarios.model';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private _myComment = new BehaviorSubject<Comentario | undefined>(undefined);
  myComment$ = this._myComment.asObservable();

  private _comentarios: Comentario[] = [];
  private _comentariosList = new BehaviorSubject<Comentario[]>([]);
  comentariosList$ = this._comentariosList.asObservable();

  private _comentariosDBList: AngularFireList<Comentario>;

  set comentarios(comentarios: Comentario[]) {
    this._comentarios = comentarios;
    this._comentariosList.next(this._comentarios);
  }

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private userLangService: UserLangService
  ) {
    this._comentariosDBList = this.db.list('comments');
    this._comentariosDBList
      .valueChanges(undefined, { idField: 'key' })
      .subscribe((list) => {
        this.comentarios = list;
        if (this.authService.currentUser())
          this.findMyComment(
            (this.authService.currentUser() as UserData).email
          );
      });
    this.authService.user$.subscribe((user) => {
      if (user) this.findMyComment(user.email);
    });
  }

  private findMyComment(email: string | null): void {
    const myComment = this._comentarios.find((c) => c.email === email);
    this._myComment.next(myComment);
  }

  saveComment(comment: string): Observable<any> {
    if (!this.authService.currentUser()) return of(false);
    const myComment = this._myComment.value;
    if (!myComment) {
      const newComment: Comentario = {
        text: comment,
        user: this.authService.currentUser()?.name as string,
        img: this.authService.currentUser()?.photo as string,
        email: this.authService.currentUser()?.email as string,
        date: new Date().valueOf(),
        lang: this.userLangService.getCurrentLang(),
      };
      return from(this._comentariosDBList.push(newComment)).pipe(
        map(
          () => true,
          () => false
        )
      );
    } else {
      return from(
        this._comentariosDBList.update(myComment.key as string, {
          text: comment,
        })
      ).pipe(
        map(
          () => true,
          () => false
        )
      );
    }
  }
}
