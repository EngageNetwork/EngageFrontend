import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { VideoRoutingModule } from './video-routing.module';
import { BaseComponent } from './base/base.component';


@NgModule({
	declarations: [
		BaseComponent
	],
	imports: [
		CommonModule,
		VideoRoutingModule,
		MatButtonModule,
		MatIconModule
	]
})

export class VideoModule { }
