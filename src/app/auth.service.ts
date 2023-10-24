import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afs: AngularFireAuth) { }

 // register(user: {email: string, password: string}) {
 //   return this.afs.createUserWithEmailAndPassword(user.email, user.password)
 // }

 // sign_in(user: {email: string, password: string}) {
 //   return this.afs.signInWithEmailAndPassword(user.email, user.password)
 // }
}
