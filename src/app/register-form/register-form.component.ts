import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment.development';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Database, getDatabase, ref, set, onValue } from 'firebase/database';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import {
  getAuth,
  updateCurrentUser,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

@Component({
  selector: 'app-registerForm',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterBoxComponent implements OnInit {
  title = 'Register';
  registerForm: FormGroup;
  app: FirebaseApp;
  db: Database;

  ngOnInit(): void {}

  constructor(
    private router: Router,
    private appservice: AppService,
    private authService: AuthService,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth
  ) {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    this.registerForm = this.fb.group({
      nickname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
  }

  sign_in_site() {
    this.router.navigateByUrl('/sign-in');
  }

  register(): void {
    var noData = '';
    const auth = getAuth();
    const current = auth.currentUser;
    const nickname = this.registerForm.value.nickname
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmpassword = this.registerForm.value.confirmpassword;
    if (email === noData) {
      window.alert('No Email entered!');
    } else if (password === noData) {
      window.alert('No Password entered!');
    } else if (confirmpassword === noData) {
      window.alert('No Confirm Password entered!');
    } else if (password < 8) {
      window.alert(
        'Password need to be at least 8 letters/numbers/symbols long!'
      );
    } else if (password != confirmpassword) {
      window.alert("Confirm Password isn't same as Password!");
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          console.log(user);
          const auth = getAuth();
          const current = auth.currentUser;
          const description = '';
          const likes = 0;
          const friends_number=0;
          const friends = '';
          const total_sent_messages = 0;
          updateProfile(user, { displayName: nickname });
          this.createInfoOfUser(user.uid,nickname,email,description,likes,friends_number,friends,total_sent_messages)

          this.router.navigateByUrl('/home');
        })
        .catch((error) => {
          console.log(error);
            alert(this.firebaseError(error.code))
        });
    }
  }

  createInfoOfUser(userId:string, nickname:string, email:string, description:string, likes:number,friends_number:number,friends:string,total_sent_messages:number) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: nickname,
      email: email,
      description: description,
      likes: likes,
      friends_number: friends_number,
      friends: friends,
      total_sent_messages: total_sent_messages,
    });
  }

  firebaseError(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Email already in exists!';
      case 'auth/invalid-email':
        return 'Email invalid!';
      default:
        return 'Error';
    }
  }
}
