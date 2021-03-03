import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', component: OverviewComponent },
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
