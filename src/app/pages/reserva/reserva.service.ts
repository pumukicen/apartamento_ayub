import { EstadoReserva, Reserva } from './reserva.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  _reserva: Reserva = {
    name: undefined,
    surname: undefined,
    email: undefined,
    phone: undefined,
    llegada: undefined,
    salida: undefined,
    adultos: undefined,
    niños: undefined,
    estado: EstadoReserva.PROCESANDO,
  };
  // _reserva: Reserva = {
  //   name: 'hola',
  //   surname: 'hola',
  //   email: 'adrian@gmail.com',
  //   phone: 627022020,
  //   llegada: new Date(),
  //   salida: new Date(),
  //   adultos: 1,
  //   niños: 1,
  //   estado: EstadoReserva.PROCESANDO,
  // };

  get reserva(): Reserva {
    return this._reserva;
  }

  set name(value: string) {
    this._reserva.name = value;
  }

  set surname(value: string) {
    this._reserva.surname = value;
  }

  set email(value: string) {
    this._reserva.email = value;
  }

  set phone(value: number) {
    this._reserva.phone = value;
  }

  set llegada(value: Date) {
    this._reserva.llegada = value;
  }

  set salida(value: Date) {
    this._reserva.salida = value;
  }

  set adultos(value: number) {
    this._reserva.adultos = value;
  }

  set niños(value: number) {
    this._reserva.niños = value;
  }

  reservar(): void {
    console.log(this._reserva);
  }
  constructor() {}
}
