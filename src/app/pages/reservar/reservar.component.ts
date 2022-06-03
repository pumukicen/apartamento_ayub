import { CalendarioComponent } from './calendario/calendario.component';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { addDays } from 'date-fns';
import { Subscription } from 'rxjs';

import { AuthService, UserData } from './../../authentication/auth.service';
import { Reserva } from './reserva.model';
import { ReservaService } from './reserva.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.scss'],
})
export class ReservarComponent implements OnDestroy {
  @ViewChild(CalendarioComponent) calendario: CalendarioComponent;
  form: FormGroup;
  reserva: Reserva;
  _subs: (Subscription | undefined)[] = [];
  user: UserData | null;
  calendarFor: 'since' | 'until';
  calendarAlert: string;
  nextBook: Date;
  private blocked: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private reservaService: ReservaService,
    private authService: AuthService
  ) {
    this.reserva = this.reservaService.reserva;
    this.form = this.formBuilder.group({
      name: new FormControl(this.user?.name || this.reserva.name, [
        Validators.required,
      ]),
      surname: new FormControl(this.user?.surname || this.reserva.surname, [
        Validators.required,
      ]),
      email: new FormControl(this.user?.email || this.reserva.email, [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl(this.reserva.phone, [
        Validators.required,
        Validators.pattern('[- +()0-9]+'),
      ]),
      llegada: new FormControl(this.reserva.llegada, [Validators.required]),
      salida: new FormControl(this.reserva.salida, [Validators.required]),
      adultos: new FormControl(this.reserva.adultos, [Validators.required]),
      niños: new FormControl(this.reserva.niños),
      observaciones: new FormControl(this.reserva.observaciones),
    });
    this._subs.push(
      this.form
        .get('name')
        ?.valueChanges.subscribe((value) => (this.reservaService.name = value))
    );
    this._subs.push(
      this.form
        .get('surname')
        ?.valueChanges.subscribe(
          (value) => (this.reservaService.surname = value)
        )
    );
    this._subs.push(
      this.form
        .get('email')
        ?.valueChanges.subscribe((value) => (this.reservaService.email = value))
    );
    this._subs.push(
      this.form
        .get('phone')
        ?.valueChanges.subscribe((value) => (this.reservaService.phone = value))
    );
    this._subs.push(
      this.form
        .get('llegada')
        ?.valueChanges.subscribe(
          (value) => (this.reservaService.llegada = value)
        )
    );
    this._subs.push(
      this.form
        .get('salida')
        ?.valueChanges.subscribe(
          (value) => (this.reservaService.salida = value)
        )
    );
    this._subs.push(
      this.form
        .get('adultos')
        ?.valueChanges.subscribe(
          (value) => (this.reservaService.adultos = value)
        )
    );
    this._subs.push(
      this.form
        .get('niños')
        ?.valueChanges.subscribe((value) => (this.reservaService.niños = value))
    );
    this._subs.push(
      this.form
        .get('observaciones')
        ?.valueChanges.subscribe(
          (value) => (this.reservaService.observaciones = value)
        )
    );
    this._subs.push(
      this.authService.user$.subscribe((user) => {
        this.user = user;
        if (!user) {
          this.form.controls['name'].setValue(undefined);
          this.form.controls['surname'].setValue(undefined);
          this.form.controls['email'].setValue(undefined);
          this.form.controls['name'].enable();
          this.form.controls['surname'].enable();
          this.form.controls['email'].enable();
        } else {
          this.form.controls['name'].setValue(user.name);
          this.form.controls['surname'].setValue(user.surname);
          this.form.controls['email'].setValue(user.email);
          this.form.controls['name'].disable();
          this.form.controls['surname'].disable();
          this.form.controls['email'].disable();
        }
      })
    );
  }

  reservar(): void {
    if (!this.form.valid) return;
    this.reservaService.reservar();
  }

  get tomorrow(): Date {
    return addDays(new Date(), 1);
  }
  get llegada(): Date {
    return this.form.get('llegada')?.value;
  }
  get dateLlegada(): Date {
    return this.llegada || this.tomorrow;
  }

  get dateSalida(): Date {
    return this.form.get('salida')?.value;
  }

  openCalendar(): void {
    this.calendarFor = this.llegada && !this.dateSalida ? 'until' : 'since';
    this.calendario.opened = true;
  }

  onSelectDate(date: Date): void {
    if (this.blocked) return;
    if (this.calendarFor === 'since') {
      this.form.controls['salida'].setValue(undefined);
      this.form.controls['llegada'].setValue(date);
      this.setNextBook();
      this.calendarFor = 'until';
    } else if (this.calendarFor === 'until') {
      if (date < this.llegada) {
        this.calendarAlert =
          'La fecha de salida debe ser posterior a la fecha de llegada';
      } else {
        this.form.controls['salida'].setValue(date);
        this.calendarAlert = '';
        this.blocked = true;
        setTimeout(() => {
          this.calendario.opened = false;
          this.blocked = false;
        }, 500);
      }
    }
  }

  private setNextBook(): void {
    const events = JSON.parse(
      JSON.stringify(this.calendario.events.map((e) => new Date(e.start)))
    ).sort((a: Date, b: Date) => (a > b ? 1 : -1));
    this.nextBook = events.find(
      (e: Date) => new Date(e) > new Date(this.llegada)
    );
  }

  ngOnDestroy(): void {
    this._subs.forEach((sub) => {
      if (sub) sub.unsubscribe();
    });
  }
}
