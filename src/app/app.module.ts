import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterBoxComponent } from './register-form/register-form.component';

import { SignedInPageComponent } from './signed-in-page/signed-in-page.component';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment.development';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SettingsComponent } from './settings/settings.component';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    AppComponent,
    RegisterBoxComponent,
    SignedInPageComponent,
    HeaderComponent,
    SignInComponent,
    InfoComponent,
    ProfileComponent,
    ChatComponent,
    UserProfileComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatSidenavModule,
    NgIf,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
