import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrServices {
  constructor(private toastr: ToastrService) {}

  // Success Toast
  success(message: string, title?: string) {
    this.toastr.success(message, title || 'Success');
  }

  // Error Toast
  error(message: string, title?: string) {
    this.toastr.error(message, title || 'Error');
  }

  // Info Toast
  info(message: string, title?: string) {
    this.toastr.info(message, title || 'Info');
  }

  // Warning Toast
  warning(message: string, title?: string) {
    this.toastr.warning(message, title || 'Warning');
  }
}
