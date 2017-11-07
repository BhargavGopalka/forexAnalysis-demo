import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './master/home/home.component';
import {AuthGuard} from '../_guards/auth.guards';
import {HeaderComponent} from "./header/header.component";
import {SubscriptionComponent} from "./master/subscription/subscription.component";

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
