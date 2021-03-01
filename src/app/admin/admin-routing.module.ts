import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
      path: 'manage',
      loadChildren: () => import ('./manage/manage.module').then(x => x.ManageModule)
    }
  ]}
  //{ path: '', component: HomeComponent },
  //{
  //  path: 'manage',
  //  loadChildren: () => import('./manage/manage.module').then(x => x.ManageModule)
  //}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
