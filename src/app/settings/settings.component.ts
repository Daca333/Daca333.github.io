import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgStyle } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TmplAstRecursiveVisitor } from '@angular/compiler';
import {
  Database,
  child,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import {
  getAuth,
  updateCurrentUser,
  updateEmail,
  updatePassword,
  updateProfile,
  validatePassword,
} from 'firebase/auth';
import { FirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment.development';
/**
 * @title Autosize sidenav
 */

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  title = 'Settings';
  app: FirebaseApp;
  db: Database;
  constructor(private router: Router) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);

    const auth = getAuth();
    const user = auth.currentUser;

    if (user === null) {
      alert('You are not signed in!');
      this.router.navigateByUrl('/register');
    }
  }
  goback() {
    alert('Going back...');
    this.router.navigateByUrl('/home');
  }

  changePass = false;
  changeEmail = false;
  changeUsername = false;
  changeDescription = false;
  verifyEmail = false;
  addPhone = false;
  deleteAcc = false;
  new_username = '';
  pass_user = '';
  pass_email = '';
  pass_pass = '';
  newemail = '';
  con_pass_pass = '';
  change_description_i = '';

  change_desc() {
    const auth = getAuth()
    const current = auth.currentUser;
    if (current) {
    this.change_description_function(current.uid,this.change_description_i)
    alert("Description Successfuly changed!")
  } else {
    alert("Error")
  }
  }
  change_description_function(
    userId: string,
    description: string,
  ) {
      const db = getDatabase();
      set(ref(db, 'users/' + userId), {
        description: description,
      });
    }

  change_username() {
    const noData = '';
    const password = this.pass_user;
    const username = this.new_username;
    const auth = getAuth();
    const current = auth.currentUser;
    if (password === noData) {
      alert('Password is wrong!');
    } else if (current !== null) {
      updateProfile(current, { displayName: username });
      alert('Username Changed!');
    } else if (current === null) {
      alert('You are not signed in!');
    }
  }

  change_email() {
    const noData = '';
    const password = this.pass_email;
    const auth = getAuth();
    const email = this.newemail;
    const current = auth.currentUser;
    if (password === noData) {
      alert('Password is wrong!');
    } else if (current !== null) {
      updateEmail(current, email);
    } else if (current === null) {
      alert('You are not signed in!');
    }
  }

  change_password() {
    const noData = '';
    const password = this.pass_pass;
    const confirm_password = this.con_pass_pass;
    const auth = getAuth();
    const email = this.newemail;
    const current = auth.currentUser;

    if (password === noData) {
      alert('Password is wrong!');
    } else if (confirm_password !== password) {
      alert('Confirm Password need to be same as password!');
    } else if (current === null) {
      alert('You are not signed in!');
    } else if (current !== null) {
      updatePassword(current, password);
    }
  }

  delete_acc() {
    const noData = '';
    const password = this.pass_pass;
    const confirm_password = this.con_pass_pass;
    const auth = getAuth();
    const email = this.newemail;
    const current = auth.currentUser;
    const dbRef = ref(getDatabase());
    onValue;
    if (current === null) {
    } else if (current !== null) {
      current.delete();
      alert('User Deleted!');
      this.router.navigateByUrl('/register');
    }
  }

  deleteAccFromDatabase(
    userId: string,
    nickname: string,
    email: string,
    description: string,
    likes: number,
    friends_number: number,
    friends: string,
    total_sent_messages: number
  ) {
    const db = getDatabase();
    const userData = {
      username: nickname,
      email: email,
      description: description,
      likes: likes,
      friends_number: friends_number,
      friends: friends,
      total_sent_messages: total_sent_messages,
    };

    const delAcc = remove(child(ref(db), userId));
  }
}
