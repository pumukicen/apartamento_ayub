import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  login({ email, password }: LoginData): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, password }: LoginData): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  currentUser(): User | null {
    return this.auth.currentUser;
  }

  isLoged(): boolean {
    return !!this.currentUser;
  }
}
