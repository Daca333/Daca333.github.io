import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterBoxComponent } from './register-form/register-form.component';
import { SignedInPageComponent } from './signed-in-page/signed-in-page.component';
import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: SignInComponent},
  {path: 'register', component: RegisterBoxComponent},
  {path: 'home', component: SignedInPageComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'info', component: InfoComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'chat', component: ChatComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
