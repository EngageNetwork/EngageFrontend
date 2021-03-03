import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyComponent } from './policy/policy.component';
import { CookiesComponent } from './cookies/cookies.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', redirectTo: 'cookies', pathMatch: 'full' },
    { path: 'policy', component: PolicyComponent },
    { path: 'cookies', component: CookiesComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyRoutingModule { }
