import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {UserAuthRoutingModule} from './user-auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserModule} from "../user/user.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserModule,
    UserAuthRoutingModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class UserAuthModule {
}
