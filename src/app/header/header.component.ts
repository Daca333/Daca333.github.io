import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = "Social Network"

  constructor(private router: Router,private appservice: AppService) {
  }
  main_page() {
    this.router.navigateByUrl('/welcome')
  }

  info_page() {
    this.router.navigateByUrl('/info')
  }


  signedin = this.appservice.get_sign_in()



  profile_page() {
    if (this.appservice.get_sign_in() === false) {
      window.alert("You are not logined!")
      this.router.navigateByUrl('/register')
    } else if (this.appservice.get_sign_in() === true) {
    this.router.navigateByUrl('/profile')
  }
}

  chat_page() {
    this.router.navigateByUrl('/chat') 
}

  refresh_site() {
    this.router.navigateByUrl('/welcome')
  }

  log_out() {
    this.appservice.set_sign_in(false)
    alert("Logining out...")
    this.router.navigateByUrl('/sign-in')
  }
}
