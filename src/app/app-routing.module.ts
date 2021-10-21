import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AffiliateLoginComponent } from './pages/affiliate-login/affiliate-login.component';

import { AffiliateRegistrationComponent } from './pages/affiliate-registration/affiliate-registration.component';


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
    path: '',
    component: DefaultComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent
      // },
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
