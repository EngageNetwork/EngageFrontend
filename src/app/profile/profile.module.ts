import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ProfileRoutingModule } from './profile-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { OverviewComponent } from './overview/overview.component';
import { UpdateComponent } from './update/update.component';
import { ViewProfileComponent } from './viewprofile/viewprofile.component';


@NgModule({
  declarations: [LayoutComponent, OverviewComponent, UpdateComponent, ViewProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    MatProgressBarModule
  ]
})

export class ProfileModule { }
