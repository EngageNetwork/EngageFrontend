import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisteredRoutingModule } from './registered-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [
    CommonModule,
    RegisteredRoutingModule
  ]
})
export class RegisteredModule { }
