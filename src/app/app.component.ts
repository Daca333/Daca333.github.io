import { Component } from '@angular/core';
import { environment } from '../environments/environment'
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue  } from "firebase/database";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {


}
