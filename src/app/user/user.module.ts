import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './master/home/home.component';
import {UserRoutingModule} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {UtilityModule} from '../utility/utility.module';
import {HeaderComponent} from './header/header.component';
import {SubscriptionComponent} from './master/subscription/subscription.component';
import {SignalsComponent} from './master/signals/signals.component';
import {TradingGuideComponent} from './master/trading-guide/trading-guide.component';
import {CouponCodeComponent} from './master/coupon-code/coupon-code.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {FaqComponent} from './master/faq/faq.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    UtilityModule,
    UserRoutingModule
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    SubscriptionComponent,
    SignalsComponent,
    TradingGuideComponent,
    CouponCodeComponent,
    FaqComponent
  ],
  exports: [HomeComponent, HeaderComponent]
})
export class UserModule {
}
