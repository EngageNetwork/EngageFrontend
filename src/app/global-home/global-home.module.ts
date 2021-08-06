import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalHomeRoutingModule } from './global-home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutServiceComponent } from './about-service/about-service.component';


@NgModule({
  declarations: [
    HomePageComponent,
    AboutServiceComponent
  ],
  imports: [
    CommonModule,
    GlobalHomeRoutingModule
  ]
})
export class GlobalHomeModule { }
