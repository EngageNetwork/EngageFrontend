import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { OverviewComponent } from './overview/overview.component';
import { UpdateComponent } from './update/update.component';
import { ViewProfileComponent } from './viewprofile/viewprofile.component'; 

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'update', component: UpdateComponent },
      { path: 'viewprofile/:id', component: ViewProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }
