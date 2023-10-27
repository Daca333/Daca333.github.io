import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from '@angular/fire/app';
import {
  DataSnapshot,
  Database,
  child,
  get,
  getDatabase,
  onValue,
  ref,
  set,
} from 'firebase/database';
import { environment } from 'src/environments/environment.development';
import { initializeApp } from 'firebase/app';
import { Profile } from './profile';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  app: FirebaseApp;
  db: Database;
  profiles: Profile[] = [];
  description = '';
  likes = 0;
  friends_number = 0;
  friends = '';
  total_sent_messages = 0;
  auth = getAuth();
  user = this.auth.currentUser;
  username = this.user?.displayName;
  constructor(
    private router: Router,
    private appservice: AppService,
    private formBuilder: FormBuilder
  ) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    const current = this.auth.currentUser;
    const desc = this.description;
    const likes_n = this.likes;
    const friends_n = this.friends_number;
    const sent_total = this.total_sent_messages;
    if (current !== null) {
      this.description_data(current.uid, desc);
      this.likes_counter(current.uid, likes_n);
      this.friends_counter(current.uid, friends_n);
      this.total_sent_messages_counter(current.uid, sent_total);
    }
  }

  ngOnInit(): void {}

  description_data(userId: string, description: string) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/${description}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val().description;
          this.description = data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  likes_counter(userId: string, likes: number) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/${likes}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data_l = snapshot.val().likes;
          this.likes = data_l;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  friends_counter(userId: string, friends_number: number) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/${friends_number}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data_f = snapshot.val().friends_number;
          this.likes = data_f;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  total_sent_messages_counter(userId: string, total_sent_messages: number) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
          const data_m = snapshot.val().total_sent_messages;
          this.total_sent_messages = data_m;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  add_like() {
    alert('Comming soon....');
  }

  share_profile() {
    alert('Comming soon....');
  }

  send_request() {
    alert('Comming soon....');
  }
}
