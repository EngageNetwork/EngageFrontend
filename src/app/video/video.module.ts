import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { InitializeComponent } from './initialize/initialize.component';


@NgModule({
  declarations: [
    InitializeComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule
  ]
})
export class VideoModule { }
