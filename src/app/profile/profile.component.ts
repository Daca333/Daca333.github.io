import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  username = "Scn"
  description = "description"
  likes = 0
  friends = 0
  total_messages = 0
  constructor(private router: Router, private appservice: AppService) {

  }

  add_like() {

  }

  share_profile() {

  }

  send_request() {

  }

}
