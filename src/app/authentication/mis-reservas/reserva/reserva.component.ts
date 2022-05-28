import { Component, Input, OnInit } from '@angular/core';

import {
  EstadoReserva,
  Reserva,
} from './../../../pages/reservar/reserva.model';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
})
export class ReservaComponent implements OnInit {
  @Input() reserva: Reserva;
  constructor() {}

  ngOnInit(): void {}

  get children(): number | undefined {
    return this.reserva.niños;
  }

  get estado(): string {
    if (this.reserva.estado === EstadoReserva.AHORA) return 'ACTUAL';
    else if (this.reserva.estado === EstadoReserva.ACEPTADA)
      return 'CONFIRMADA';
    else if (this.reserva.estado === EstadoReserva.RECHAZADA)
      return 'RECHAZADA';
    else return 'PROCESANDO';
  }

  get estadoStyle(): string {
    if (this.reserva.estado === EstadoReserva.AHORA) return 'now';
    else if (this.reserva.estado === EstadoReserva.ACEPTADA) return 'confirm';
    else if (this.reserva.estado === EstadoReserva.RECHAZADA) return 'denied';
    else return 'process';
  }
}
