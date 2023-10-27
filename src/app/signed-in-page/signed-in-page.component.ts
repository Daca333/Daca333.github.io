import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire/app';
import { Database, getDatabase } from 'firebase/database';
import { environment } from 'src/environments/environment.development';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-signed-in-page',
  templateUrl: './signed-in-page.component.html',
  styleUrls: ['./signed-in-page.component.scss']
})
export class SignedInPageComponent implements OnInit {

  app: FirebaseApp;
  db: Database;

constructor(private router: Router) {
  this.app = initializeApp(environment.firebase);
  this.db = getDatabase(this.app);
}

ngOnInit(): void {

  const auth = getAuth()
  const user = auth.currentUser

  if (user === null) {
    alert("You are not signed in!")
    this.router.navigateByUrl('/register')
  };
}
}
