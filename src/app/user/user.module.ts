import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './master/home/home.component';
import {UserRoutingModule} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {UtilityModule} from '../utility/utility.module';
import { HeaderComponent } from './header/header.component';
import { SubscriptionComponent } from './master/subscription/subscription.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    UtilityModule,
    UserRoutingModule
  ],
  declarations: [HomeComponent, HeaderComponent, SubscriptionComponent],
  exports: [HomeComponent, HeaderComponent]
})
export class UserModule {
}
