import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { TranslationsService } from './common/translations/translations.service';
import { ApartamentoComponent } from './pages/apartamento/apartamento.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CondicionesComponent } from './pages/condiciones/condiciones.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { EntornoComponent } from './pages/entorno/entorno.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LugaresComponent } from './pages/lugares/lugares.component';
import { NormasComponent } from './pages/normas/normas.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { FooterComponent } from './common/footer/footer.component';
import { ComentarioComponent } from './pages/inicio/comentario/comentario.component';

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
    FooterComponent,
    ComentarioComponent,
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
