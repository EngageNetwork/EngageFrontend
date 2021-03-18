import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlateRoutingModule } from './slate-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [OverviewComponent, DetailsComponent],
  imports: [
    CommonModule,
    SlateRoutingModule
  ]
})
export class SlateModule { }
