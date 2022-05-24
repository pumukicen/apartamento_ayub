import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { updateProfile } from '@firebase/auth';
import { from, map, tap, BehaviorSubject } from 'rxjs';

export interface LoginData {
  name?: string;
  email: string;
  password: string;
}
export interface UserData {
  name: string | null;
  email: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<UserData | null>(null);
  user$ = this._user.asObservable();

  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged((user) =>
      this._user.next(
        !user ? null : { name: user?.displayName, email: user?.email }
      )
    );
  }

  login({ email, password }: LoginData) {
    from(signInWithEmailAndPassword(this.auth, email, password)).subscribe(() =>
      this.redirect()
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
      .subscribe(() => this.redirect());
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
}
