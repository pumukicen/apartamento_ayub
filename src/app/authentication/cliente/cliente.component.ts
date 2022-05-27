import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService, UserData } from '../auth.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent {
  form: FormGroup;
  _subs: (Subscription | undefined)[] = [];
  user: UserData | null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl(this.user?.name, [Validators.required]),
      surname: new FormControl(this.user?.surname),
      email: new FormControl({ value: this.user?.email, disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
    });
    this._subs.push(
      this.authService.user$.subscribe((user) => {
        this.user = user;
        if (!user) return;
        this.form.controls['name'].setValue(user.name);
        this.form.controls['surname'].setValue(user.surname);
        this.form.controls['email'].setValue(user.email);
      })
    );
  }

  modificarDatos(): void {
    if (!this.form.valid) return;
    console.log('MODIFICAR DATOS');
    const name = this.form.get('name')?.value;
    const surname = this.form.get('surname')?.valid
      ? ' ' + this.form.get('surname')?.value
      : '';
    this.authService.updateUserData(name + surname);
  }
}
