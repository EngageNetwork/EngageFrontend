import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit {
	id: string;

	constructor(
		private route: ActivatedRoute,
		private title: Title
	) { }
	
	ngOnInit(): void {
		this.title.setTitle('Messages');

		this.id = this.route.snapshot.params['id'];
	}
	
	updateActiveContactId(contactId: string) {
		this.id = contactId;
	}
}
