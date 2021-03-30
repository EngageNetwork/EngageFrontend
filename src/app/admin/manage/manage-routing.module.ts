import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubNavComponent } from './subnav/subnav.component';
import { LayoutComponent } from './layout/layout.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: '', component: SubNavComponent, outlet: 'subnav' },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: OverviewComponent },
      {
        path: 'accounts',
        loadChildren: () => import('./accounts/accounts.module').then(x => x.AccountsModule)
      },
      {
        path: 'slates',
        loadChildren: () => import('./slate/slate.module').then(x => x.SlateModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManageRoutingModule { }
