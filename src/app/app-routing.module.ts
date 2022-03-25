import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApartamentoComponent } from './pages/apartamento/apartamento.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'apartamento', component: ApartamentoComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
