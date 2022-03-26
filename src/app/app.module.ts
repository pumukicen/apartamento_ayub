import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { ApartamentoComponent } from './pages/apartamento/apartamento.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LocalizacionComponent } from './pages/localizacion/localizacion.component';
import { ExperienciasComponent } from './pages/experiencias/experiencias.component';
import { EntornoComponent } from './pages/entorno/entorno.component';
import { BlogComponent } from './pages/blog/blog.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { ReservaComponent } from './pages/reserva/reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    ApartamentoComponent,
    LocalizacionComponent,
    ExperienciasComponent,
    EntornoComponent,
    BlogComponent,
    InformacionComponent,
    ReservaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
