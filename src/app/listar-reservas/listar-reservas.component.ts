import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Reserva } from '../reserva';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.css']
})
export class ListarReservasComponent implements OnInit{
  reservas: Reserva[] = [];
  @Output() editarReservaEvent = new EventEmitter<Reserva>();
  @Output() eliminarReservaEvent = new EventEmitter<Reserva>();

  constructor(private router: Router) {}


  ngOnInit(): void {
    // Recupera las reservas almacenadas en localStorage
    const reservasStr = localStorage.getItem('reservas');
    if (reservasStr) {
      this.reservas = JSON.parse(reservasStr);
    }
  }

  // Agregar este método para manejar el evento de nueva reserva agregada
  actualizarReservas() {
    // Recupera las reservas almacenadas en localStorage
    const reservasStr = localStorage.getItem('reservas');
    if (reservasStr) {
      this.reservas = JSON.parse(reservasStr);
    }
  }

  editarReserva(reserva: Reserva) {
    // Redirige a la página de edición con el ID de la reserva
    this.router.navigateByUrl(`/editar/${reserva.id}`);
  }

  eliminarReserva(reserva: Reserva) {
    const confirmar = confirm('¿Estás seguro de eliminar esta reserva?');
    if (confirmar) {
      this.reservas = this.reservas.filter(r => r !== reserva);
      localStorage.setItem('reservas', JSON.stringify(this.reservas));
      this.eliminarReservaEvent.emit(reserva);
    }
  }

}
