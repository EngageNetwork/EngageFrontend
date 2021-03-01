import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorRoutingModule } from './tutor-routing.module';

import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TutorRoutingModule
  ]
})

export class TutorModule { }
