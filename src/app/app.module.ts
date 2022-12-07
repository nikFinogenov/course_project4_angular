import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./modules/material/material.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import {AppRoutingModule} from "./app-routing.module";
import {StateModule} from "./modules/state/state.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { InfoComponent } from './components/info/info.component';
import {AuthInterceptor} from "./modules/auth/interceptors/auth.interceptor";
import { SecuredComponentComponent } from './components/secured-component/secured-component.component';
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    InfoComponent,
    SecuredComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    AppRoutingModule,
    StateModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
