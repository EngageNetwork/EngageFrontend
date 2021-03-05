import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalRoutingModule } from './legal-routing.module';
import { TermsComponent } from './terms/terms.component';
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  declarations: [TermsComponent, OverviewComponent],
  imports: [
    CommonModule,
    LegalRoutingModule
  ]
})
export class LegalModule { }
