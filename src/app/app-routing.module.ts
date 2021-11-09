import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AffiliateLoginComponent } from './pages/affiliate-login/affiliate-login.component';

import { AffiliateRegistrationComponent } from './pages/affiliate-registration/affiliate-registration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReferComponent } from './pages/refer/refer.component';
import { TrainingComponent } from './pages/training/training.component';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp.component';
import { AuthGuard } from './services/auth.gaurds';


const routes: Routes = [
  {
    path: '',
    component: AffiliateRegistrationComponent,
  },
  {
    path: 'login',
    component: AffiliateLoginComponent,
  },
  {
    path: 'verify',
    component: VerifyOtpComponent,
  },
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'training',
        component: TrainingComponent,
      },
      {
        path: 'refer',
        component: ReferComponent,
      },
      // {
      //   path: 'settings',
      //   component: SettingsComponent,
      // },
      // {
      //   path: 'affiliates',
      //   component: AffiliatesComponent,
      // },
      // {
      //   path: 'packages',
      //   component: PackagesComponent,
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
