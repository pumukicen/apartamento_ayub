import { Router } from '@angular/router';
import { MyToastrService } from './../../common/toastr/my-toastr.service';
import { AuthService, UserData } from './../../authentication/auth.service';
import { EstadoReserva, Reserva } from './reserva.model';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { endOfDay, startOfDay } from 'date-fns';
@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  _reservaIsDone: boolean;
  _reservasDBList: AngularFireList<Reserva>;
  _reservas: Reserva[];
  _misReservas: Reserva[];

  _reserva: Reserva = {
    name: undefined,
    surname: undefined,
    email: undefined,
    phone: '627922929',
    llegada: undefined,
    salida: undefined,
    adultos: 2,
    niños: 0,
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

  set phone(value: string) {
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

  get reservaIsDone(): boolean {
    return this._reservaIsDone;
  }

  get misReservas(): Reserva[] {
    return this._misReservas;
  }

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private myToastrService: MyToastrService,
    private router: Router
  ) {
    this._reservasDBList = this.db.list('reservas');
    this._reservasDBList.valueChanges().subscribe((reservas) => {
      this._reservas = this.getReservasFuturas(
        reservas.map((r) => this.convertReservaFromDB(r))
      );
      this._misReservas = this.getReservasByUser(
        this._reservas,
        this.authService.currentUser()
      );
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
          this._reservaIsDone = true;
          this.router.navigate(['/confirm']);
        },
        () => this.myToastrService.error('No ha sido posible crear tu reserva')
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
    if (
      entry.llegada >= startOfDay(new Date()) &&
      entry.salida <= endOfDay(new Date())
    )
      entry.estado = EstadoReserva.AHORA;
    return entry;
  }

  private getReservasFuturas(reservas: Reserva[]): Reserva[] {
    return reservas.filter(
      (r) => (r.llegada as Date) >= startOfDay(new Date())
    );
  }
}
