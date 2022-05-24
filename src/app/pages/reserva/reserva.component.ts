import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService, UserData } from './../../authentication/auth.service';
import { Reserva } from './reserva.model';
import { ReservaService } from './reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
})
export class ReservaComponent implements OnDestroy {
  form: FormGroup;
  reserva: Reserva;
  _subs: (Subscription | undefined)[] = [];

  user: UserData | null;

  constructor(private formBuilder: FormBuilder, private reservaService: ReservaService, private authService: AuthService) {
    this.reserva = this.reservaService.reserva;
    this.form = this.formBuilder.group({
      name: new FormControl(this.user?.name || this.reserva.name, [Validators.required]),
      surname: new FormControl(this.reserva.surname, [Validators.required]),
      email: new FormControl(this.user?.email || this.reserva.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.reserva.phone, [Validators.required, Validators.pattern('[- +()0-9]+')]),
      llegada: new FormControl(this.reserva.llegada, [Validators.required]),
      salida: new FormControl(this.reserva.salida, [Validators.required]),
      adultos: new FormControl(this.reserva.adultos, [Validators.required]),
      niños: new FormControl(this.reserva.niños),
    });
    this._subs.push(this.form.get("name")?.valueChanges.subscribe((value) => {if (!this.user) this.reservaService.name = value;}));
    this._subs.push(this.form.get("surname")?.valueChanges.subscribe((value) => this.reservaService.surname = value));
    this._subs.push(this.form.get("email")?.valueChanges.subscribe((value) => {if (!this.user) this.reservaService.email = value}));
    this._subs.push(this.form.get("phone")?.valueChanges.subscribe((value) => this.reservaService.phone = value));
    this._subs.push(this.form.get("llegada")?.valueChanges.subscribe((value) => this.reservaService.llegada = value));
    this._subs.push(this.form.get("salida")?.valueChanges.subscribe((value) => this.reservaService.salida = value));
    this._subs.push(this.form.get("adultos")?.valueChanges.subscribe((value) => this.reservaService.adultos = value));
    this._subs.push(this.form.get("niños")?.valueChanges.subscribe((value) => this.reservaService.niños = value));
    this._subs.push(this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user) return;
      this.form.controls["name"].setValue(user.name);
      this.form.controls["email"].setValue(user.email);
    }))
  }

  reservar(): void {
    if (!this.form.valid) return;
    this.reservaService.reservar();
  }
  
  get dateLlegada(): Date {
    return this.form.get("llegada")?.value;
  }

  get dateSalida(): Date {
    return this.form.get("salida")?.value;
  }

  ngOnDestroy(): void {
    this._subs.forEach(sub => {
      if (sub) sub.unsubscribe();
    }) 
  }
}
