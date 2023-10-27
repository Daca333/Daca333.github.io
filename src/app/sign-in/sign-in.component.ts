import { AppService } from './../app.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ErrorStateMatcher } from '@angular/material/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseApp } from '@angular/fire/app';
import { Database, getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  title = "Sign in";
  loginForm: FormGroup;

  app: FirebaseApp;
  db: Database;

  constructor(private router: Router, private appservice: AppService, private authService: AuthService, private afAuth: AngularFireAuth, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
  }


  ngOnInit(): void {
  }

  register_site() {
    this.router.navigateByUrl('/register')
  }

  sign_in() {
  const noData = "";
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;
  const auth = getAuth()
  const current = auth.currentUser
  if (email === noData) {
    window.alert("No Email entered!")
  } else if (password === noData) {
    window.alert("No Password entered!")
  } else {
    this.afAuth.signInWithEmailAndPassword(email, password).then((user) =>{
      auth.onAuthStateChanged((current) => {
        if (current) {
          alert("Signing in...")
          console.log(user)
          this.router.navigateByUrl('/home')
        }
      });

    }).catch((error) =>{
      console.log(error);
      alert(this.firebaseError(error.code))
    })
  }
}

firebaseError(code: string) {

  switch(code) {
    case 'auth/email-already-in-use':
      return 'Email already in exists!';
    case 'auth/invalid-email':
      return 'Email invalid!';
    default:
      return 'Invalid email or password!'
  }
}

 delay (ms: number) {
  // @ts-ignore
  return new Promise(resolve => new setTimeout(resolve, ms));
}

}
