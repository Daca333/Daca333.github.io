import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment.development';
import { Component, OnInit } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue, get, child  } from "firebase/database";
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Chat } from '../chat/chat'
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  title = "Your Chats"

  app: FirebaseApp;
  db: Database;
  form: FormGroup;
  username = '';
  group = [];
  message = '';
  chats: Chat[] = [];

  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth) {
    const auth = getAuth();
    const user = auth.currentUser;
    const username = user?.displayName;
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    this.form = this.formBuilder.group({
      'message' : [],
      username
    });
    const current = auth.currentUser;
    console.log(current?.displayName)
  }

  ngOnInit(): void {
    const chatsRef = ref(this.db, 'chats');
    onValue(chatsRef, (snapshot: any) => {
      const data = snapshot.val();
      for(let id in data) {
        if (!this.chats.map(chat => chat.id).includes(id)) {
          this.chats.push(data[id])
        }
      }
    });
  };

  onChatSubmit(form: any) {
    const chat = form;
    const auth = getAuth();
    const user = auth.currentUser;
    const username = user?.displayName;
    chat.timestamp = new Date().toString();
    chat.id = uuidv4();
    this.messages_counter(user?.uid)
    set(ref(this.db, `chats/${chat.id}`), chat);
    this.form = this.formBuilder.group({
      'message' : [],
      username
    });
  }

  messages_counter(userId:any) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());

        const newCount: number = snapshot.val().total_sent_messages;
        console.log(newCount);


        set(ref(this.db, `users/${userId}/`), {
          total_sent_messages: newCount + 1
       } )
      } else {
        alert("Error")
      }
    })

  }

}
