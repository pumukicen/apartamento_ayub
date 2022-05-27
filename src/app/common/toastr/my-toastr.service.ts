import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyToastrService {
  constructor(private toastrService: ToastrService) {}

  success(msg: string, title?: string): void {
    this.toastrService.success(msg, title, {
      closeButton: true,
    });
  }
  error(msg: string): void {
    this.toastrService.error(msg, 'ERROR', {
      closeButton: true,
    });
  }
}
