import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

import { AccountService, SlateService } from '@app/_services';

@Component({
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
	listings: any[];
	
	constructor(
		private snackBar: MatSnackBar,
		private accountService: AccountService, // Ignore "unused" warnings
		private slateService: SlateService,
		private title: Title
	) { }
	
	ngOnInit(): void {
		this.title.setTitle('Available Positions');

		this.slateService.getAllListings()
		.pipe(first())
		.subscribe(listings => {
			listings.forEach(function(item) {
				item.startDateTime = moment(item.startDateTime).format("LT MMMM Do[,] YYYY");
				item.endDateTime = moment(item.endDateTime).format("LT MMMM Do[,] YYYY");

				this.accountService.getByIdPublic(item.account)
				.pipe(first())
				.subscribe(account => {
					item.tutorName = account.firstName + ' ' + account.lastName;
				});
			}.bind(this));
			this.listings = listings;
		});
	}
	
	registerPosition(id: string) {
		const listing = this.listings.find(x => x.id === id);
		if (confirm(`Sign up for position?`)) {
			listing.isRegistering = true;
			this.slateService.register(id)
			.pipe(first())
			.subscribe({
				next: () => {
					// Display success message to user
					this.snackBar.open('Registration successful', 'Close', { duration: 10000 });
					this.listings = this.listings.filter(x => x.id !== id);
				},
				error: error => {
					// Display error to user
					this.snackBar.open(error, 'Close', { duration: 10000 });
					listing.isRegistering = false;
				}
			});
		}
	}
}
	