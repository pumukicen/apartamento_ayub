import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private _heigth = new BehaviorSubject<number>(20);
  height = this._heigth.asObservable();

  setHeight(value: number) {
    this._heigth.next(value + 20);
  }
}
