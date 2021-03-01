import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ListingsRoutingModule } from './listings-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { LayoutComponent } from './layout/layout.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    OverviewComponent,
    LayoutComponent,
    AddComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListingsRoutingModule
  ]
})
export class ListingsModule { }
