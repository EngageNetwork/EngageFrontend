import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { OverviewComponent } from './overview/overview.component';

import { ChatUIComponent } from './nested/chat-ui/chat-ui.component';
import { UserListComponent } from './nested/user-list/user-list.component';

@NgModule({
	declarations: [
  		OverviewComponent,
		ChatUIComponent,
		UserListComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		MessageRoutingModule
	]
})
export class MessageModule { }
