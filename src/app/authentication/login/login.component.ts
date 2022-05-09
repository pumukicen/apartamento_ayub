import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginData } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    const email: string = this.email?.value;
    const password: string = this.password?.value;
    this.login({ email, password });
    // this.formData.emit(this.form.value);
  }

  login(loginData: LoginData) {
    this.authService
      .login(loginData)
      // .then(() => this.router.navigate(['/dashboard']))
      .then(() => console.log('PUTA MADRE'))
      .catch((e) => console.log(e.message));
  }
}
