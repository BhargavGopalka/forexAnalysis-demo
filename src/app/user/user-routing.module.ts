import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './master/home/home.component';
import {AuthGuard} from '../_guards/auth.guards';
import {HeaderComponent} from "./header/header.component";
import {SubscriptionComponent} from "./master/subscription/subscription.component";
import {SignalsComponent} from "./master/signals/signals.component";
import {TradingGuideComponent} from "./master/trading-guide/trading-guide.component";
import {CouponCodeComponent} from "./master/coupon-code/coupon-code.component";
import {FaqComponent} from "./master/faq/faq.component";
import {LatestNewsComponent} from "./master/latest-news/latest-news.component";
import {EnquiryComponent} from './master/enquiry/enquiry.component';

const routes: Routes = [
  {
    path: 'header',
    component: HeaderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subscription',
    component: SubscriptionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signal',
    component: SignalsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'trading',
    component: TradingGuideComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'coupon',
    component: CouponCodeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'faq',
    component: FaqComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'news',
    component: LatestNewsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'enquiry',
    component: EnquiryComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class UserRoutingModule {
}
