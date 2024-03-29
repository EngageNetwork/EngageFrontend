import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailableRoutingModule } from './available-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [
    CommonModule,
    AvailableRoutingModule
  ]
})
export class AvailableModule { }
