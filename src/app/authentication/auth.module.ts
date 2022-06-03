import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DateFnsModule } from 'ngx-date-fns';

import { TranslationsService } from '../common/translations/translations.service';
import { MaterialModule } from '../material/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AvatarComponent } from './cliente/avatar/avatar.component';
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
    AvatarComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    DateFnsModule.forRoot(),
    TranslateModule,
  ],
})
export class AuthModule {}
