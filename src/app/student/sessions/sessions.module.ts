import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SubNavComponent } from './subnav/subnav.component';
import { OverviewComponent } from './overview/overview.component';


@NgModule({
  declarations: [
    LayoutComponent,
    SubNavComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    SessionsRoutingModule
  ]
})
export class SessionsModule { }
