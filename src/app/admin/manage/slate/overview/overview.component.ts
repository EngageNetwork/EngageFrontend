import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

import { AccountService, SlateService } from '@app/_services';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
	slates: any[];
	interval: any;
	
	constructor(
		private accountService: AccountService,
		private slateService: SlateService,
		private title: Title
	) {}
	
	ngOnInit(): void {
		this.title.setTitle('Slate Management | Admin');

		this.fetchData();
		this.interval = setInterval(() => {
			this.fetchData();
		}, 30000);
	}
	
	fetchData() {
		this.slateService.getAllSlates()
		.pipe(first())
		.subscribe(slates => {
			slates.forEach(function(item) {
				item.startDateTime = moment(item.startDateTime).format("LT MMMM Do[,] YYYY");
				item.endDateTime = moment(item.endDateTime).format("LT MMMM Do[,] YYYY");

				this.accountService.getById(item.account)
				.pipe(first())
				.subscribe(account => {
					item.tutorName = [account.firstName, account.lastName].join(' ');
				});

				if (!!item.registered) {
					this.accountService.getById(item.registered)
					.pipe(first())
					.subscribe(account => {
						item.studentName = [account.firstName, account.lastName].join(' ');
					});
				}
			}.bind(this));

			this.slates = slates;
		});
	}
}
