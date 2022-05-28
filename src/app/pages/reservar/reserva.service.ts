import { Router } from '@angular/router';
import { MyToastrService } from './../../common/toastr/my-toastr.service';
import { AuthService, UserData } from './../../authentication/auth.service';
import { EstadoReserva, Reserva } from './reserva.model';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { endOfDay, startOfDay, addDays } from 'date-fns';
@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  _reservaIsDone: boolean;
  _reservasDBList: AngularFireList<Reserva>;
  _reservas: Reserva[] = [];
  _misReservas: Reserva[] = [];

  _reserva: Reserva = {
    name: undefined,
    surname: undefined,
    email: undefined,
    phone: undefined,
    llegada: undefined,
    salida: undefined,
    adultos: undefined,
    niños: 0,
    estado: EstadoReserva.PROCESANDO,
    observaciones: undefined,
  };
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

  set phone(value: string | undefined) {
    this._reserva.phone = value;
  }

  set llegada(value: Date | undefined) {
    this._reserva.llegada = value;
  }

  set salida(value: Date | undefined) {
    this._reserva.salida = value;
  }

  set adultos(value: number | undefined) {
    this._reserva.adultos = value;
  }

  set niños(value: number) {
    this._reserva.niños = value;
  }

  get reservaIsDone(): boolean {
    return this._reservaIsDone;
  }

  get misReservas(): Reserva[] {
    return this._misReservas;
  }

  get reservasList(): Reserva[] {
    return this._reservas;
  }

  set observaciones(value: string | undefined) {
    this._reserva.observaciones = value;
  }

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private myToastrService: MyToastrService,
    private router: Router
  ) {
    this.authService.user$.subscribe((user) => {
      if (user && this._reservasDBList) this.setMisReservas();
      if (!this._reservasDBList) this.getReservas();
    });
  }

  reservar(): void {
    const overlaped = this.checkOverlapping(this._reservas, this._reserva);
    if (overlaped) {
      this.myToastrService.error('Ya hay una reserva en estas fechas');
      return;
    }
    this._reservasDBList
      .push(this.convertReservaForDB(this._reserva) as Reserva)
      .then(
        () => {
          this.myToastrService.success('Se ha creado tu solicitud de reserva.');
          this.cleanReserva();
          this._reservaIsDone = true;
          this.router.navigate(['/confirm']);
        },
        () => this.myToastrService.error('No ha sido posible crear tu reserva')
      );
  }
  private getReservas(): void {
    this._reservasDBList = this.db.list('reservas');
    this._reservasDBList.valueChanges().subscribe((reservas) => {
      this._reservas = this.getReservasFuturas(
        reservas.map((r) => this.convertReservaFromDB(r))
      );
      this.setMisReservas();
    });
  }
  private setMisReservas(): void {
    this._misReservas = this.getReservasByUser(
      this._reservas,
      this.authService.currentUser()
    );
  }
  private getReservasByUser(
    reservas: Reserva[],
    user: UserData | null
  ): Reserva[] {
    if (!user) return [];
    return reservas.filter((reserva) => reserva.email === user.email);
  }

  private checkOverlapping(reservas: Reserva[], miReserva: Reserva): boolean {
    const since = miReserva.llegada;
    const until = miReserva.salida;
    if (!since || !until) return true;
    return !!reservas.find((r) => {
      if (!r.salida || !r.llegada) return false;
      if (since <= r.salida && since >= r.llegada) return true;
      if (until >= r.llegada && until <= r.salida) return true;
      return false;
    });
  }

  private convertReservaForDB(reserva: Reserva): object {
    const entry = JSON.parse(JSON.stringify(reserva));
    entry.llegada = startOfDay(reserva.llegada as Date).valueOf();
    entry.salida = endOfDay(reserva.salida as Date).valueOf();
    return entry;
  }

  private convertReservaFromDB(reserva: any): Reserva {
    const entry = JSON.parse(JSON.stringify(reserva));
    entry.llegada = new Date(reserva.llegada as number);
    entry.salida = new Date(reserva.salida as number);
    if (entry.llegada <= new Date() && entry.salida >= new Date())
      entry.estado = EstadoReserva.AHORA;
    return entry;
  }

  private getReservasFuturas(reservas: Reserva[]): Reserva[] {
    return reservas.filter((r) => (r.salida as Date) >= new Date());
  }

  private cleanReserva(): void {
    this.phone = undefined;
    this.llegada = undefined;
    this.salida = undefined;
    this.adultos = undefined;
    this.niños = 0;
    this.observaciones = undefined;
  }
}
