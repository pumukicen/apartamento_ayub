import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApartamentoComponent } from './pages/apartamento/apartamento.component';
import { BlogComponent } from './pages/blog/blog.component';
import { EntornoComponent } from './pages/entorno/entorno.component';
import { ExperienciasComponent } from './pages/experiencias/experiencias.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LocalizacionComponent } from './pages/localizacion/localizacion.component';
import { ReservaComponent } from './pages/reserva/reserva.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'apartamento', component: ApartamentoComponent },
  { path: 'localizacion', component: LocalizacionComponent },
  { path: 'experiencias', component: ExperienciasComponent },
  { path: 'entorno', component: EntornoComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'informacion', component: InformacionComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
