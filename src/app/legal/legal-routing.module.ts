import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', redirectTo: 'terms', pathMatch: 'full' },
    { path: 'terms', component: TermsComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule { }
