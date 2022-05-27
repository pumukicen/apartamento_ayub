import { Reserva } from './../../pages/reservar/reserva.model';
import { ReservaService } from './../../pages/reservar/reserva.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss'],
})
export class MisReservasComponent implements OnInit {
  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {}

  get reservas(): Reserva[] {
    return this.reservaService.misReservas;
  }
}
