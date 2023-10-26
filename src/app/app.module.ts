import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarReservasComponent } from './listar-reservas/listar-reservas.component';
import { EditarReservaComponent } from './editar-reservas/editar-reservas.component';
import { AgregarReservaComponent } from './agregar-reserva/agregar-reserva.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListarReservasComponent,
    EditarReservaComponent,
    AgregarReservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
