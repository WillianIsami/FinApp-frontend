import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  private isEnable: boolean;

  constructor() {
    this.isEnable = environment.isEnable;
  }

  log(msg: string): void {
    if (this.isEnable) {
      console.log(msg);
    }
  }
  error(msg: string): void {
    if (this.isEnable) {
      console.error(msg);
    }
  }
  warn(msg: string): void {
    if (this.isEnable) {
      console.warn(msg);
    }
  }
}
