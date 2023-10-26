import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarReservasComponent } from './listar-reservas/listar-reservas.component';
import { EditarReservaComponent } from './editar-reservas/editar-reservas.component';
import { AgregarReservaComponent } from './agregar-reserva/agregar-reserva.component';

const routes: Routes = [
  { path: 'listar', component: ListarReservasComponent },
  { path: 'agregar', component: AgregarReservaComponent },
  { path: 'editar/:id', component: EditarReservaComponent },
  { path: '', redirectTo: '/listar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
