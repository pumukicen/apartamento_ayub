import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let sub: Subscription;
    if (!this.authService.currentUser()) {
      let wait = false;
      sub = this.authService.user$.subscribe((value) => {
        if (value) sub.unsubscribe();
        if (wait) this.router.navigate(value ? [state.url] : ['auth/login']);
        wait = true;
      });
      return false;
    }
    return true;
  }
}
