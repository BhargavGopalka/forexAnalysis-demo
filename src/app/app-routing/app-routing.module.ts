import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../_guards/auth.guards';
import {LoginComponent} from '../user-auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
