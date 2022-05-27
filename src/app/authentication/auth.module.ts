import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ClienteComponent } from './cliente/cliente.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, ClienteComponent, MisReservasComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
