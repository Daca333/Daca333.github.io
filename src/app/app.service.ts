import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  signed_in = false


  set_sign_in(value:boolean) {
    this.signed_in = value
  }

  get_sign_in() {
    return this.signed_in
  }
  constructor() {}
}
