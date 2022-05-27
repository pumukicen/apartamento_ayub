import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DateFnsModule } from 'ngx-date-fns';

import { AuthRoutingModule } from './auth-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { LoginComponent } from './login/login.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { ReservaComponent } from './mis-reservas/reserva/reserva.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ClienteComponent,
    MisReservasComponent,
    ReservaComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    DateFnsModule.forRoot(),
  ],
})
export class AuthModule {}
