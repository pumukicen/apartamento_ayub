import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { ReservaService } from '../reservar/reserva.service';

@Injectable({
  providedIn: 'root',
})
export class ReservaConfirmGuard implements CanActivate {
  constructor(public reservaService: ReservaService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.reservaService.reservaIsDone) this.router.navigate(['inicio']);
    return true;
  }
}
