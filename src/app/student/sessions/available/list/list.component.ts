import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

import { SlateService } from '@app/_services';

@Component({
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
	listings: any[];
	interval: any;
	
	constructor(
		private snackBar: MatSnackBar,
		private slateService: SlateService,
		private title: Title
	) { }
	
	ngOnInit(): void {
		this.title.setTitle('Available Positions');

		this.fetchData();
		this.interval = setInterval(() => {
			this.fetchData();
		}, 60000);
	}
	
	fetchData() {
		this.slateService.getAllListings()
		.pipe(first())
		.subscribe(listings => {
			listings.forEach(function(item) {
				item.startDateTime = moment(item.startDateTime).format('LT MMMM Do[,] YYYY');
				item.endDateTime = moment(item.endDateTime).format('LT MMMM Do[,] YYYY');
			})

			this.listings = listings;
		});
	}

	registerSession(id: string) {
		const listing = this.listings.find(x => x.id === id);
		if (confirm(`Sign up for session?`)) {
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
	