import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', redirectTo: 'terms', pathMatch: 'full' },
    { path: 'terms', component: TermsComponent },
    {
      path: 'privacy',
      loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule)
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule { }
