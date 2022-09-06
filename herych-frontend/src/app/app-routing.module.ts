import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {FeedbackPageComponent} from "./feedback-page/feedback-page.component";
import { SteamComponent } from './steam/steam.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: '', component: MainPageComponent},
  {path: 'admin', component: AdminPanelComponent},
  {path: 'feedback', component: FeedbackPageComponent},
  {path: 'steam', component: SteamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
