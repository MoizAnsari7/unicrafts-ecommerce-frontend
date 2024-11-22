import { Injectable } from '@angular/core';
import * as Notiflix from 'notiflix';

@Injectable({
  providedIn: 'root',
})
export class NotiflixService {
  constructor() {
    // Global settings (optional)
    Notiflix.Notify.init({
      position: 'right-bottom',
      timeout: 3000,
      cssAnimationStyle: 'fade',
    });
  }

  success(message: string) {
    Notiflix.Notify.success(message);
  }

  error(message: string) {
    Notiflix.Notify.failure(message);
  }

  info(message: string) {
    Notiflix.Notify.info(message);
  }

  warning(message: string) {
    Notiflix.Notify.warning(message);
  }
}
