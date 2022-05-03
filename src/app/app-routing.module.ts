import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'apartamento', component: ApartamentoComponent },
  { path: 'restaurantes', component: RestaurantesComponent },
  { path: 'lugares', component: LugaresComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'entorno', component: EntornoComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'normas', component: NormasComponent },
  { path: 'condiciones', component: CondicionesComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
