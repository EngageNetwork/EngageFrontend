import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ProfileRoutingModule } from './profile-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { OverviewComponent } from './overview/overview.component';
import { UpdateComponent } from './update/update.component';
import { ViewProfileComponent } from './viewprofile/viewprofile.component';
import { TutorApplicationComponent } from './tutor-application/tutor-application.component';
import { UpdateTranscriptComponent } from './update-transcript/update-transcript.component';


@NgModule({
  declarations: [LayoutComponent, OverviewComponent, UpdateComponent, ViewProfileComponent, TutorApplicationComponent, UpdateTranscriptComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule
  ]
})

export class ProfileModule { }
