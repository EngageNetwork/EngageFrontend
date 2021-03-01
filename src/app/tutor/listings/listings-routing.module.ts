import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { OverviewComponent } from './overview/overview.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'add', component: AddComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'edit/:id', component: EditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ListingsRoutingModule { }
