import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';

import { MessageService } from '@app/_services';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
	@Output() changeContactIdEvent = new EventEmitter<string>();

	contacts: any;
	
	constructor(
		private messageService: MessageService
	) { }
	
	ngOnInit(): void {
		this.messageService.getContacts()
		.pipe(first())
		.subscribe(contacts => this.contacts = contacts);
	}

	updateActiveContactId(contactId: string) {
		this.changeContactIdEvent.emit(contactId);
	}
}
