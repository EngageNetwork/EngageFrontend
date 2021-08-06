import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { HackathonComponent } from './hackathon/hackathon.component';


@NgModule({
  declarations: [
    HackathonComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
