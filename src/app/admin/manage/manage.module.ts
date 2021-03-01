import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { OverviewComponent } from './overview/overview.component';
import { SubNavComponent } from './subnav/subnav.component';

@NgModule({
  declarations: [LayoutComponent, OverviewComponent, SubNavComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManageRoutingModule
  ]
})

export class ManageModule { }
