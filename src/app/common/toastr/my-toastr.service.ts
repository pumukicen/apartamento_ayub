import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MyToastrService {
  constructor(
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) {}

  success(msg: string): void {
    this.toastrService.success(this.translateService.instant(msg), undefined, {
      closeButton: true,
    });
  }
  error(msg: string): void {
    this.toastrService.error(
      this.translateService.instant(msg),
      this.translateService.instant('toastr_error'),
      {
        closeButton: true,
      }
    );
  }
}
