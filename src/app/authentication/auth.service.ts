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
    private myToastrService: MyToastrService
  ) {
    this.auth.onAuthStateChanged((user) => this.createUserData(user));
  }

  login({ email, password }: LoginData) {
    from(signInWithEmailAndPassword(this.auth, email, password)).subscribe(
      () => this.redirect(),
      () => this.myToastrService.error('toastr_login_error')
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
        (userCredential) => {
          this.createUserData({
            ...userCredential.user,
            displayName: name as string,
          });
          this.myToastrService.success('toastr_signup_succes');
          this.redirect();
        },
        () => this.myToastrService.error('toastr_signup_error')
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
      this.myToastrService.error('toastr_update_error');
    } else {
      from(
        updateProfile(this.fireBaseUser, {
          displayName: `${name} ${surname}`,
        })
      ).subscribe(() => {
        this.myToastrService.success('toastr_update_succes');
        this._user.next({
          ...this._user.value,
          name: name,
          surname: surname,
        } as UserData);
      });
    }
  }

  private createUserData(user: User | null): void {
    if (user?.displayName) {
      const name =
        (user?.displayName as string).split(' ')[0] ||
        (user?.displayName as string);
      const surname = user?.displayName ? user.displayName.split(' ')[1] : null;
      const email = user?.email || null;
      const phone = user?.phoneNumber || null;
      const photo = user?.photoURL || null;
      const userObject = { name, surname, email, phone, photo };
      this._user.next(userObject);
    } else {
      this._user.next(null);
    }
  }

  updateAvatar(photo: string): void {
    from(
      updateProfile(this.auth.currentUser as User, { photoURL: photo })
    ).subscribe(
      () => {
        this._user.next({ ...(this._user.value as UserData), photo: photo });
        this.myToastrService.success('toastr_avatar_succes');
      },
      () => this.myToastrService.error('toastr_avatar_error')
    );
  }
}
