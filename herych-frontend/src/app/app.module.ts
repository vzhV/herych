import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {PrimeIcons} from "primeng/api";
import {DialogModule} from "primeng/dialog";
import { SimpleButtonComponent } from './simple-button/simple-button.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    MainPageComponent,
    AdminPanelComponent,
    SimpleButtonComponent,
    FeedbackPageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ColorPickerModule,
        BrowserAnimationsModule,
        TableModule,
        ButtonModule,
        DialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
