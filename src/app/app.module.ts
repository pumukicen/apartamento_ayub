import { NormasComponent } from './pages/normas/normas.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { TranslationsService } from './common/translations/translations.service';
import { ApartamentoComponent } from './pages/apartamento/apartamento.component';
import { BlogComponent } from './pages/blog/blog.component';
import { EntornoComponent } from './pages/entorno/entorno.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { LugaresComponent } from './pages/lugares/lugares.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { CondicionesComponent } from './pages/condiciones/condiciones.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    ApartamentoComponent,
    RestaurantesComponent,
    LugaresComponent,
    EventosComponent,
    EntornoComponent,
    ServiciosComponent,
    NormasComponent,
    CondicionesComponent,
    BlogComponent,
    ContactoComponent,
    ReservaComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslationsService },
    }),
    NgxWebstorageModule.forRoot({
      prefix: 'apartamento-ayub',
      separator: '.',
      caseSensitive: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
