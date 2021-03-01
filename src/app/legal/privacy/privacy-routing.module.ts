import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CookiesComponent } from './cookies/cookies.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', redirectTo: 'cookies', pathMatch: 'full' },
    { path: 'cookies', component: CookiesComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyRoutingModule { }
