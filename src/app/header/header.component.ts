import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { getAuth } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment.development';
import { Component, OnInit } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue } from 'firebase/database';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title = 'Social Network';

  app: FirebaseApp;
  db: Database;

  constructor(
    private router: Router,
    private appservice: AppService,
    private afAuth: AngularFireAuth
  ) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
  }

  ngOnInit(): void {}

  main_page() {
    this.router.navigateByUrl('/home');
  }

  info_page() {
    this.router.navigateByUrl('/info');
  }

  profile_page() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
      this.router.navigateByUrl('/profile');
    } else if (user === null) {
      window.alert('You are not logined!');
      this.router.navigateByUrl('/register');
    }
  }

  chat_page() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
      this.router.navigateByUrl('/chat');
    } else if (user === null) {
      window.alert('You are not logined!');
      this.router.navigateByUrl('/register');
    }
  }

  refresh_site() {
    this.router.navigateByUrl('/home');
  }

  log_out() {
    alert('Logining out...');
    this.afAuth.signOut();
  //  this.router.navigateByUrl('/register');
    window.location.reload()
  }

  settings_open() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
      this.router.navigateByUrl('/settings');
    } else if (user === null) {
      window.alert('You are not logined!');
      this.router.navigateByUrl('/register');
    }
  }
}
