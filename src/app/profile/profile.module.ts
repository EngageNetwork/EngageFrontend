import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { OverviewComponent } from './overview/overview.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [LayoutComponent, OverviewComponent, UpdateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ]
})

export class ProfileModule { }
