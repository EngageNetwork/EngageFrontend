import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { PrivacyRoutingModule } from './privacy-routing.module';
import { CookiesComponent } from './cookies/cookies.component';
import { PolicyComponent } from './policy/policy.component';


@NgModule({
  declarations: [CookiesComponent, PolicyComponent],
  imports: [
    CommonModule,
    PrivacyRoutingModule,
    MatExpansionModule
  ]
})
export class PrivacyModule { }
