import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './master/home/home.component';
import {UserRoutingModule} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {UtilityModule} from '../utility/utility.module';
import { HeaderComponent } from './header/header.component';
import { SubscriptionComponent } from './master/subscription/subscription.component';
import { SignalsComponent } from './master/signals/signals.component';
import { TradingGuideComponent } from './master/trading-guide/trading-guide.component';
import { CouponCodeComponent } from './master/coupon-code/coupon-code.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    UtilityModule,
    UserRoutingModule
  ],
  declarations: [HomeComponent, HeaderComponent, SubscriptionComponent, SignalsComponent, TradingGuideComponent, CouponCodeComponent],
  exports: [HomeComponent, HeaderComponent]
})
export class UserModule {
}
