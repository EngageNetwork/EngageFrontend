import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { ChatUIComponent } from './chat-ui/chat-ui.component';


@NgModule({
	declarations: [
		ChatUIComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		MessageRoutingModule
	]
})
export class MessageModule { }
