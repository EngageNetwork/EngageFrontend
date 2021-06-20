import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsroomRoutingModule } from './newsroom-routing.module';
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    NewsroomRoutingModule
  ]
})
export class NewsroomModule { }
