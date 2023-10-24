import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registerForm',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterBoxComponent implements OnInit {
  title= "Register"
  registerForm: FormGroup;

  ngOnInit(): void {
  }

  constructor(private router: Router, private appservice: AppService, private authService: AuthService, private fb: FormBuilder, private afAuth: AngularFireAuth) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    })
  }



  sign_in_site()
  {
  this.router.navigateByUrl('/sign-in')
}

  register(): void {
    var noData = ''
    const username = this.registerForm.value.username;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmpassword = this.registerForm.value.confirmpassword
    if (username === noData) {
      window.alert("No Username entered!")
    } else if (email === noData) {
      window.alert("No Email entered!")
    } else if (password === noData) {
      window.alert("No Password entered!")
    } else if (confirmpassword === noData) {
      window.alert("No Confirm Password entered!")
    } else if (password < 8) {
      window.alert("Password need to be at least 8 letters/numbers/symbols long!")
    } else if (password != confirmpassword) {
      window.alert("Confirm Password isn't same as Password!")
    } else {
      this.afAuth.createUserWithEmailAndPassword(email, password).then((user) =>{
        console.log(user)
        this.router.navigateByUrl('/home')
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
        return 'Error'
    }
  }


}
