import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlateRoutingModule } from './slate-routing.module';
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    SlateRoutingModule
  ]
})
export class SlateModule { }
