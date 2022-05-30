import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer.component';
import { FeedbackComponent } from './common/header/feedback/feedback.component';
import { HeaderComponent } from './common/header/header.component';
import { PageContentDirective } from './common/page-content/page-content.directive';
import { TranslationsService } from './common/translations/translations.service';
import { MaterialModule } from './material/material.module';
import { ApartamentoComponent } from './pages/apartamento/apartamento.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CondicionesComponent } from './pages/condiciones/condiciones.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { EntornoComponent } from './pages/entorno/entorno.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { ComentarioComponent } from './pages/inicio/comentario/comentario.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LugaresComponent } from './pages/lugares/lugares.component';
import { NormasComponent } from './pages/normas/normas.component';
import { ReservaConfirmComponent } from './pages/reserva-confirm/reserva-confirm.component';
import { CalendarioComponent } from './pages/reservar/calendario/calendario.component';
import { ReservarComponent } from './pages/reservar/reservar.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';

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
    ReservarComponent,
    ReservaConfirmComponent,
    FooterComponent,
    ComentarioComponent,
    PageContentDirective,
    CalendarioComponent,
    FeedbackComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GoogleMapsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslationsService },
    }),
    NgxWebstorageModule.forRoot({
      prefix: 'apartamento-ayub',
      separator: '.',
      caseSensitive: true,
    }),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
