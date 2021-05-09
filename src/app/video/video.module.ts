import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { BaseComponent } from './base/base.component';


@NgModule({
	declarations: [
		BaseComponent
	],
	imports: [
		CommonModule,
		VideoRoutingModule
	]
})

export class VideoModule { }
