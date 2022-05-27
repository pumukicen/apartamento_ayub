import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { updateProfile, User } from '@firebase/auth';
import { BehaviorSubject, from, map } from 'rxjs';

import { MyToastrService } from './../common/toastr/my-toastr.service';

export interface LoginData {
  name?: string;
  email: string;
  password: string;
}
export interface UserData {
  name: string | null;
  surname?: string | null;
  email: string | null;
  phone?: string | null;
  photo?: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<UserData | null>(null);
  user$ = this._user.asObservable();

  constructor(
    private auth: Auth,
    private router: Router,
    private myToastService: MyToastrService
  ) {
    this.auth.onAuthStateChanged((user) => {
      const name = user?.displayName ? user.displayName.split(' ')[0] : null;
      const surname = user?.displayName ? user.displayName.split(' ')[1] : null;
      const email = user?.email || null;
      const phone = user?.phoneNumber || null;
      const photo = user?.photoURL || null;
      this._user.next(!user ? null : { name, surname, email, phone, photo });
    });
  }

  login({ email, password }: LoginData) {
    from(signInWithEmailAndPassword(this.auth, email, password)).subscribe(
      () => this.redirect(),
      () => this.myToastService.error('email o contraseña incorrectos')
    );
  }

  register({ name, email, password }: LoginData) {
    from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        map((user: UserCredential) => {
          updateProfile(user.user, { displayName: name });
          return user;
        })
      )
      .subscribe(
        () => this.redirect(),
        () => this.myToastService.error('este emai ya está registrado')
      );
  }

  logout() {
    from(signOut(this.auth)).subscribe(() => this.redirect());
  }

  currentUser(): UserData | null {
    return this._user.value;
  }

  redirect(): void {
    this.router.navigate(['/inicio']);
  }

  get fireBaseUser(): User | null {
    return this.auth.currentUser;
  }

  updateUserData(name: string, surname: string): void {
    if (!this.fireBaseUser) {
      this.myToastService.error('No hay ningún usuario registrado');
    } else {
      from(
        updateProfile(this.fireBaseUser, {
          displayName: `${name} ${surname}`,
        })
      ).subscribe(() => {
        this.myToastService.success('Se han actualizado tus datos personales');
        this._user.next({
          ...this._user.value,
          name: name,
          surname: surname,
        } as UserData);
      });
    }
  }
}
