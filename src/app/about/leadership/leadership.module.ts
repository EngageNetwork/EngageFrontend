import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadershipRoutingModule } from './leadership-routing.module';
import { MichaelWangComponent } from './michael-wang/michael-wang.component';
import { GerryChenComponent } from './gerry-chen/gerry-chen.component';


@NgModule({
  declarations: [
    MichaelWangComponent,
    GerryChenComponent
  ],
  imports: [
    CommonModule,
    LeadershipRoutingModule
  ]
})
export class LeadershipModule { }
