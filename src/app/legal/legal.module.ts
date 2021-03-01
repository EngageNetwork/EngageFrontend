import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalRoutingModule } from './legal-routing.module';
import { TermsComponent } from './terms/terms.component';


@NgModule({
  declarations: [TermsComponent],
  imports: [
    CommonModule,
    LegalRoutingModule
  ]
})
export class LegalModule { }
