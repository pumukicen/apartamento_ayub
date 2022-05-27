import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../authentication/auth.service';

@Component({
  selector: 'app-reserva-confirm',
  templateUrl: './reserva-confirm.component.html',
  styleUrls: ['./reserva-confirm.component.scss'],
})
export class ReservaConfirmComponent {
  isLoged: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoged = !!this.authService.currentUser();
  }

  goLogin(): void {
    this.router.navigate(['/auth/signup']);
  }
}
