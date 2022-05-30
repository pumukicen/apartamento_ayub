import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  PAGE_LANGUAGE,
  pageLanguages,
} from 'src/app/common/translations/translations';

import { AuthService, UserData } from '../auth.service';
import { UserLangService } from './../../common/translations/user-lang.service';
import { AvatarComponent } from './avatar/avatar.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent {
  @ViewChild(AvatarComponent) avatar: AvatarComponent;
  form: FormGroup;
  _subs: (Subscription | undefined)[] = [];
  user: UserData | null;
  photoUrl: string;
  languages: PAGE_LANGUAGE[] = pageLanguages;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userLangService: UserLangService
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl(this.user?.name, [Validators.required]),
      surname: new FormControl(this.user?.surname),
      email: new FormControl({ value: this.user?.email, disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      language: new FormControl({ value: this.currentLang }),
    });
    console.log(this.currentLang);
    this._subs.push(
      this.authService.user$.subscribe((user) => {
        this.user = user;
        if (!user) return;
        this.form.controls['name'].setValue(user.name);
        this.form.controls['surname'].setValue(user.surname);
        this.form.controls['email'].setValue(user.email);
        this.setPhotoUrl(user.photo as string);
      })
    );
  }

  get currentLang(): string | undefined {
    return this.userLangService.getCurrentLang();
  }

  modificarDatos(): void {
    if (!this.form.valid) return;
    const name = this.form.get('name')?.value;
    const surname = this.form.get('surname')?.valid
      ? this.form.get('surname')?.value
      : '';
    this.authService.updateUserData(name, surname);
  }

  changeAvatar(): void {
    this.avatar.openFile();
  }
  changeLang(): void {
    this.userLangService.changeLang(this.form.controls['language'].value);
  }
  private setPhotoUrl(url: string) {
    this.photoUrl = url ? `url("${url}")` : `url("./assets/img/persona.png")`;
  }
}
