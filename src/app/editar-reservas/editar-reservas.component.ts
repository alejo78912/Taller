import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../reserva';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reservas.component.html',
  styleUrls: ['./editar-reservas.component.css'],
})
export class EditarReservaComponent implements OnInit {
  formularioEdicion: FormGroup;
  reservaId: any;
  reserva: Reserva = new Reserva();
  reservas: Reserva[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formularioEdicion = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoCliente: [''],
      fechaLlegada: [''],
      fechaSalida: [''],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.reservaId = params['id'];

      const reservasStr = localStorage.getItem('reservas');
      this.reservas = JSON.parse(reservasStr || '[]');

      this.reserva = this.reservas.find((r: Reserva) => r.id === this.reservaId) || new Reserva();

      if (this.reserva.id) {
        this.formularioEdicion.setValue({
          nombre: this.reserva.nombre,
          email: this.reserva.email,
          tipoCliente: this.reserva.tipoCliente,
          fechaLlegada: this.reserva.fechaLlegada,
          fechaSalida: this.reserva.fechaSalida,
        });
      } else {
        console.error('Reserva no encontrada en localStorage.');
      }
    });
  }

  confirmarEdicion() {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Estás seguro de editar esta reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.guardarEdicion();
      }
    });
  }

  guardarEdicion() {
    if (this.reserva.id) {
      const nuevosValores = this.formularioEdicion.value;
      const indiceReserva = this.reservas.findIndex((r: Reserva) => r.id === this.reservaId);

      if (indiceReserva !== -1) {
        this.reservas[indiceReserva] = {
          ...this.reserva,
          nombre: nuevosValores.nombre,
          email: nuevosValores.email,
          tipoCliente: nuevosValores.tipoCliente,
          fechaLlegada: nuevosValores.fechaLlegada,
          fechaSalida: nuevosValores.fechaSalida,
        };

        localStorage.setItem('reservas', JSON.stringify(this.reservas));
        
        // Muestra un SweetAlert2 exitoso y redirige a la página de listar reservas
        Swal.fire('Éxito', 'Reserva editada correctamente', 'success').then(() => {
          this.router.navigate(['/listar']);
        });
      } else {
        // Muestra un SweetAlert2 de error si la reserva no se encuentra
        Swal.fire('Error', 'Reserva no encontrada en el almacenamiento local.', 'error');
      }
    } else {
      // Muestra un SweetAlert2 de error si no se puede editar la reserva
      Swal.fire('Error', 'No se puede guardar la edición: Reserva no encontrada.', 'error');
    }
  }
}
