import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reserva } from '../reserva';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-reserva',
  templateUrl: './agregar-reserva.component.html',
  styleUrls: ['./agregar-reserva.component.css']
})
export class AgregarReservaComponent implements OnInit {
  nuevaReservaForm: FormGroup;
  @Output() agregarReservaEvent = new EventEmitter<Reserva>();
  @Output() nuevaReservaAgregada = new EventEmitter<void>();


  constructor(private formBuilder: FormBuilder) {
    this.nuevaReservaForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoCliente: ['', Validators.required],
      fechaLlegada: ['', Validators.required],
      fechaSalida: ['', Validators.required]
    });
  }
  
  
  ngOnInit(): void {}

  agregarReserva() {
    if (this.nuevaReservaForm.valid) {
      const nuevaReserva: Reserva = this.nuevaReservaForm.value;
      this.agregarReservaEvent.emit(nuevaReserva);
  
      // Guardar la reserva en localStorage
      const reservas: Reserva[] = JSON.parse(localStorage.getItem('reservas') || '[]');
      reservas.push(nuevaReserva);
      localStorage.setItem('reservas', JSON.stringify(reservas));
  
      this.nuevaReservaForm.reset();
      Swal.fire('¡Reserva agregada!', 'La reserva se ha agregado con éxito.', 'success');
  
      // Emitir el evento de nueva reserva agregada
      this.nuevaReservaAgregada.emit();
    } else {
      this.marcarCamposComoTocados(this.nuevaReservaForm);
      Swal.fire('Error', 'Por favor, complete todos los campos correctamente.', 'error');
    }
  }
  

  marcarCamposComoTocados(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.marcarCamposComoTocados(control);
      }
    });
  }
}
